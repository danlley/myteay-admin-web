import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../../asyncService/asyncService.service';
import {PxPackageDetailModel} from '../../goodsQuery/goodsPackages/goodsPackages.component';
import {PxGoodsConfigModel} from '../../../../model/goods';

@Component({
    selector: 'app-view-detail-goods-notice-show',
    templateUrl: './goodsNoticeShow.component.html',
    styleUrls: ['./goodsNoticeShow.component.css']
})
export class GoodsNoticeShowComponent implements OnInit {
    title = '商品摘要详情!';

    ftConfitService: FatigeConfigService;
    @Input() formData = new PxGoodsConfigModel();
    templateConfigList: any[];
    packagesDetailsList: PxPackageDetailModel[] = [];
    packageTypeList: any[];

    packagesNoticeList: PxPackageNoticeModel[] = [];

    constructor(ftConfitService: FatigeConfigService, private datePipe: DatePipe,
                private eventBus: EventService, private activeRoute: ActivatedRoute) {
        this.ftConfitService = ftConfitService;
    }

    ngOnInit(): void {
        console.log(this.title);
        this.initContactList();
        this.initGoodsList();
        this.initGoodsNoticeList();
    }

    initGoodsNoticeList() {
        // 套餐包
        this.ftConfitService.getAllPacakgesNoticeByGoodsId(this.formData.goodsId + '').subscribe(res => {
            this.packagesNoticeList = this.filterResult(res.json());
            console.log('packagesNoticeList：', this.packagesNoticeList);
        });
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

export class PxPackageNoticeModel {
    packagesNoticeId: string;
    operationType = 'PX_ADD';
    goodsId: string;
    packagesNoticeName: string;
    gmtCreated: string;
    gmtModified: string;
}

