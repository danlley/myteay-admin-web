import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../../asyncService/asyncService.service';
import {PxPackageDetailModel} from '../../goodsQuery/goodsPackages/goodsPackages.component';

@Component({
    selector: 'app-view-detail-goods-detail',
    templateUrl: './goodsDetail.component.html',
    styleUrls: ['./goodsDetail.component.css']
})
export class GoodsDetailComponent implements OnInit {
    title = '商品摘要详情!';

    ftConfitService: FatigeConfigService;
    @Input() formData = new PxGoodsConfigModel();
    templateConfigList: any[];
    packagesDetailsList: PxPackageDetailModel[] = [];
    packageTypeList: any[];

    constructor(ftConfitService: FatigeConfigService, private datePipe: DatePipe,
                private eventBus: EventService, private activeRoute: ActivatedRoute) {
        this.ftConfitService = ftConfitService;
    }

    ngOnInit(): void {
        console.log(this.title);
        this.initContactList();
        this.initGoodsList();
    }

    initGoodsList() {
        // 套餐包
        this.ftConfitService.getAllPacakgesDetailByGoodsId(this.formData.goodsId + '').subscribe(res => {
            const tmpPackagesDetailList = this.filterResult(res.json());
            console.log('tmpPackagesDetailList---------->' + this.formData.goodsId, tmpPackagesDetailList);

            if (tmpPackagesDetailList !== null) {
                this.packagesDetailsList = [];
                tmpPackagesDetailList.forEach(e => {
                    const packagesDetail = new PxPackageDetailModel();
                    packagesDetail.gmtCreated = this.datePipe.transform(e.gmtCreated, 'yyyy-MM-dd HH:mm:ss');
                    packagesDetail.gmtModified = this.datePipe.transform(e.gmtModified, 'yyyy-MM-dd HH:mm:ss');
                    packagesDetail.packagesDetailId = e.packagesDetailId;
                    packagesDetail.packageDetailName = e.packageDetailName;
                    packagesDetail.goodsId = e.goodsId;
                    packagesDetail.height = '90px';
                    // 子套餐
                    this.ftConfitService.getAllSubPacakgesByGoodsId(packagesDetail.packagesDetailId).subscribe(el => {
                        packagesDetail.tableElement = {
                            'tableHeaders': [],
                            'tableOp': [['删除', '']],
                            'tableContent': []
                        };
                        this.templateConfigList = this.filterResult(el.json());
                        if (this.templateConfigList !== null) {
                            this.templateConfigList.forEach(es => {
                                const gmtCreated = this.datePipe.transform(es.gmtCreated, 'yyyy-MM-dd HH:mm:ss');
                                const show = this.getPackageTypeShow(es.subPackagesType);
                                packagesDetail.tableElement.tableContent.push
                                ([es.subPackagesId, es.packagesDetailId, es.subPackagesName, es.subPackagesAmount, show,
                                    es.subPackagePrice, gmtCreated]);
                                console.log('es---------->' + this.formData.goodsId, es);
                            });
                        }
                    });
                    this.packagesDetailsList.push(packagesDetail);
                });
            }
        });
    }

    initContactList() {
        this.ftConfitService.getDataDictionaryByKey('PxSubPackagesTypeEnum').subscribe(res => {
            this.packageTypeList = this.filterResult(res.json());
        });
    }

    private getPackageTypeShow(packageType: string): string {
        let show: string;
        this.packageTypeList.forEach(t => {
            if (t.bizKey === packageType) {
                show = t.value;
            }
        });

        return show;
    }

    filterResult(data): any {
        console.log('开始过滤处理结果：', data);

        if ('CAMP_OPERATE_SUCCESS' !== data.operateResult) {
            console.log('返回结果失败：', data);
            return null;
        }
        return data.result;
    }
}

export class PxGoodsConfigModel {
    goodsId: number;
    operationType = 'PX_MODIFY';
    shopId: number;
    goodsImage: string;
    goodsTitle: string;
    goodsDesc: string;
    goodsPrice: string;
    goodsCommPrice: string;
    goodsOnlineTime: string;
    orderType: string;
    isHuiyuan: string;
    isQuan: string;
    isTuan: string;
    goodsSellAmount: string;
    gmtExpired: string;
    gmtCreated: string;
    gmtModified: string;
}
