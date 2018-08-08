import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {CommonServie} from '../../../../utils/common.servie';

@Component({
    selector: 'app-query-goods',
    templateUrl: './goodsPackages.component.html',
    styleUrls: ['./goodsPackages.component.css']
})

export class GoodsPackagesComponent implements OnInit {

    title = '套餐包管理!';
    packageTypeList: any[];
    templateConfigList: any[];
    packagesDetailsList: PxPackageDetailModel[] = [];
    shopData;
    goodsData;
    goodsId;
    goodsPackagesDetailName;
    goodsPackagesDetailNameModified;
    isNeedShowSubPackagesAdd = false;

    subPackageData: PxSubPackagesModel = new PxSubPackagesModel();

    tableElement = {
        'tableHeaders': [],
        'tableOp': [],
        'tableContent': []
    };

    constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe, private commonService: CommonServie,
                public activeRoute: ActivatedRoute, private eventBus: EventService) {
        this.eventBus.registerySubject('single_sub_packages_for_delete').subscribe(e => {
            console.log('表格操作目标（删除）：', e);
            this.doDeleteSubPackages(e[0]);
        });
    }

    ngOnInit(): void {
        this.initShopData();
        this.initContactList();
        this.initGoodsList();
    }

    private initShopData() {
        const tmpData: string = this.activeRoute.snapshot.queryParams['shop'];
        this.shopData = tmpData.split(',');
        console.log('=====--------->', this.shopData);

        const tmpGoodsData: string = this.activeRoute.snapshot.queryParams['goods'];
        this.goodsData = tmpGoodsData.split(',');
        this.goodsId = this.goodsData[0];
        console.log('=====--------->', this.goodsData);
    }

    load() {
        this.initGoodsList();
    }

    doDeleteSubPackages(elements) {
        this.subPackageData = new PxSubPackagesModel();
        this.subPackageData.subPackagesId = elements;
        this.subPackageData.operationType = 'PX_DELETE';
        console.log('=======================>', this.subPackageData);
        this.ftConfitService.manageSubPackages(this.subPackageData).subscribe(res => {
            const result = this.commonService.filterResult(res.json());
            console.log('开始过滤处理结果：', result);
            this.subPackageData = new PxSubPackagesModel();
            this.initGoodsList();
        });
    }

    doAddSubPackages(elements) {
        this.subPackageData.packagesDetailId = elements.packagesDetailId;
        console.log('=======================>', this.subPackageData);
        this.ftConfitService.manageSubPackages(this.subPackageData).subscribe(res => {
            const result = this.commonService.filterResult(res.json());
            console.log('开始过滤处理结果：', result);
            this.subPackageData = new PxSubPackagesModel();
            this.initGoodsList();
        });
    }

    initGoodsList() {
        this.ftConfitService.getAllPacakgesDetailByGoodsId(this.goodsId).subscribe(res => {
            const tmpPackagesDetailList = this.commonService.filterResult(res.json());
            this.packagesDetailsList = [];
            if (tmpPackagesDetailList !== null) {
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
                            'tableOp': [['删除', 'single_sub_packages_for_delete']],
                            'tableContent': []
                        };
                        this.templateConfigList = this.commonService.filterResult(el.json());
                        if (this.templateConfigList !== null) {
                            packagesDetail.tableElement.tableHeaders = ['子套餐ID', '套餐包ID', '子套餐商品名称', '子套餐商品数量', '子套餐类型', '子商品单价', '创建时间'];
                            this.templateConfigList.forEach(es => {
                                const gmtCreated = this.datePipe.transform(es.gmtCreated, 'yyyy-MM-dd HH:mm:ss');
                                const show = this.getPackageTypeShow(es.subPackagesType);
                                packagesDetail.tableElement.tableContent.push
                                ([es.subPackagesId, es.packagesDetailId, es.subPackagesName, es.subPackagesAmount, show,
                                    es.subPackagePrice, gmtCreated]);
                            });
                        }
                    });
                    this.packagesDetailsList.push(packagesDetail);
                });
            }
        });
    }

    private getPackageTypeShow(packageType: string): string {
        let show = '';
        this.packageTypeList.forEach(t => {
            if (t.bizKey === packageType) {
                show = t.value;
            }
        });

        return show;
    }

    public gotoAddPackageDetail(): void {
        console.log('--------goodsPackagesDetailName------------>', this.goodsPackagesDetailName);

        const packagesDetail = new PxPackageDetailModel();
        packagesDetail.goodsId = this.goodsId;
        packagesDetail.packageDetailName = this.goodsPackagesDetailName;
        packagesDetail.operationType = 'PX_ADD';
        this.ftConfitService.managePackagesDetail(packagesDetail).subscribe(res => {
            const result = this.commonService.filterResult(res.json());
            console.log('开始过滤处理结果：', result);
            this.initGoodsList();
        });
    }

    public modifyPackagesDetail(elements): void {
        console.log('--------goodsPackagesDetailNameModified------------>', this.goodsPackagesDetailNameModified);

        const packagesDetail = new PxPackageDetailModel();
        packagesDetail.goodsId = this.goodsId;
        packagesDetail.packageDetailName = elements.goodsPackagesDetailNameModified;
        packagesDetail.operationType = 'PX_MODIFY';
        packagesDetail.packagesDetailId = elements.packagesDetailId;
        this.ftConfitService.managePackagesDetail(packagesDetail).subscribe(res => {
            const result = this.commonService.filterResult(res.json());
            console.log('开始过滤处理结果：', result);
            this.initGoodsList();
        });
    }

    public deletePackagesDetail(elements): void {
        console.log('--------goodsPackagesDetailNameModified------------>', this.goodsPackagesDetailNameModified);

        const packagesDetail = new PxPackageDetailModel();
        packagesDetail.goodsId = this.goodsId;
        packagesDetail.packageDetailName = elements.packageDetailName;
        packagesDetail.operationType = 'PX_DELETE';
        packagesDetail.packagesDetailId = elements.packagesDetailId;
        this.ftConfitService.managePackagesDetail(packagesDetail).subscribe(res => {
            const result = this.commonService.filterResult(res.json());
            console.log('开始过滤处理结果：', result);
            this.initGoodsList();
        });
    }

    public addSubPackages(elements): void {
        elements.isNeedShowSubPackagesAdd = !elements.isNeedShowSubPackagesAdd;
        elements.height = '190px';
    }

    initContactList() {
        this.ftConfitService.getDataDictionaryByKey('PxSubPackagesTypeEnum').subscribe(res => {
            this.packageTypeList = this.commonService.filterResult(res.json());
        });
    }
}

export class PxPackageDetailModel {
    packagesDetailId: string;
    operationType = 'PX_ADD';
    goodsId: number;
    packageDetailName: string;
    gmtCreated: string;
    gmtModified: string;
    height: string;
    tableElement = {
        'tableHeaders': [],
        'tableOp': [],
        'tableContent': []
    };
}

export class PxSubPackagesModel {
    subPackagesId: string;
    packagesDetailId: string;
    subPackagesName: string;
    subPackagesAmount: string;
    subPackagesType: string;
    subPackagePrice: string;
    operationType = 'PX_ADD';
    gmtCreated: string;
    gmtModified: string;
}
