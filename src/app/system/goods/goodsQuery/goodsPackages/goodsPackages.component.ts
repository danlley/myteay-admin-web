import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-query-goods',
    templateUrl: './goodsPackages.component.html',
    styleUrls: ['./goodsPackages.component.css']
})

export class GoodsPackagesComponent implements OnInit {

    title = '套餐包管理!';
    ftConfitService: FatigeConfigService;
    packageTypeList: any[];
    templateConfigList: any[];
    packagesDetailsList: PxPackageDetailModel[] = [];
    shopData;
    goodsData;
    summaryTableElement: any[];
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

    constructor(ftConfitService: FatigeConfigService, private datePipe: DatePipe,
                public activeRoute: ActivatedRoute, private eventBus: EventService) {
        this.ftConfitService = ftConfitService;

        // this.eventBus.registerySubject('system_goods_for_view_detail').subscribe(e => {
        //     const sendData = [this.shopData, e[0]];
        //     console.log('表格操作目标（详情）：', sendData);
        //     this.eventBus.publish('system_goods_view_detail', sendData);
        // });
        //
        // this.eventBus.registerySubject('single_goods_for_modify').subscribe(e => {
        //     const sendData = [this.shopData, e[0]];
        //     console.log('表格操作目标（修改）：', sendData);
        //     this.eventBus.publish('system_goods_modify', sendData);
        // });
        //
        // this.eventBus.registerySubject('single_goods_delete').subscribe(e => {
        //     console.log('表格操作目标（删除）：', e[0]);
        //     this.deleteSingleGoods(e[0]);
        // });
    }

    ngOnInit(): void {
        this.initShopData();
        this.initContactList();
        this.initGoodsList();
    }

    private initShopData() {
        const tmpData: string = this.activeRoute.snapshot.queryParams['shop'];
        const tmpArr: string[] = tmpData.split(',');
        this.shopData = tmpArr;
        console.log('=====--------->', this.shopData);

        const tmpGoodsData: string = this.activeRoute.snapshot.queryParams['goods'];
        const tmpGoodsArr: string[] = tmpGoodsData.split(',');
        this.goodsData = tmpGoodsArr;
        this.goodsId = this.goodsData[0];
        console.log('=====--------->', this.goodsData);

        this.constructSummaryTableData();
    }

    private constructSummaryTableData() {
        const goodsName: PxSummaryTableElement = new PxSummaryTableElement();
        goodsName.face = '商品名称';
        goodsName.value = this.goodsData[1];

        const name: PxSummaryTableElement = new PxSummaryTableElement();
        name.face = '店铺名称';
        name.value = this.shopData[1];

        const goodsType: PxSummaryTableElement = new PxSummaryTableElement();
        goodsType.face = '套餐类型';
        goodsType.value = this.goodsData[2];

        const price: PxSummaryTableElement = new PxSummaryTableElement();
        price.face = '当前售价';
        price.value = this.goodsData[3];

        const sellsAmount: PxSummaryTableElement = new PxSummaryTableElement();
        sellsAmount.face = '当前销量';
        sellsAmount.value = this.goodsData[4];

        const expired: PxSummaryTableElement = new PxSummaryTableElement();
        expired.face = '过期时间';
        expired.value = this.goodsData[5];

        this.summaryTableElement = [[name, goodsName, goodsType], [price, sellsAmount, expired]];
    }

    load() {
        this.initGoodsList();
    }

    doAddSubPackages(elements) {
        this.subPackageData.packagesDetailId = elements.packagesDetailId;
        console.log('=======================>', this.subPackageData);
        this.ftConfitService.manageSubPackages(this.subPackageData).subscribe(res => {
            const result = this.filterResult(res.json());
            console.log('开始过滤处理结果：', result);
            this.subPackageData = new PxSubPackagesModel();
            this.initGoodsList();
        });
    }

    initGoodsList() {



        // 套餐包
        this.ftConfitService.getAllPacakgesDetailByGoodsId(this.goodsId).subscribe(res => {
            const tmpPackagesDetailList = this.filterResult(res.json());
            if (tmpPackagesDetailList !== null) {
                this.packagesDetailsList = [];
                tmpPackagesDetailList.forEach(e => {
                    const packagesDetail = new PxPackageDetailModel();
                    packagesDetail.gmtCreated = this.datePipe.transform(e.gmtCreated, 'yyyy-MM-dd hh:mm:ss');
                    packagesDetail.gmtModified = this.datePipe.transform(e.gmtModified, 'yyyy-MM-dd hh:mm:ss');
                    packagesDetail.packagesDetailId = e.packagesDetailId;
                    packagesDetail.packageDetailName = e.packageDetailName;
                    packagesDetail.goodsId = e.goodsId;
                    packagesDetail.height = '90px';
                    // 子套餐
                    this.ftConfitService.getAllSubPacakgesByGoodsId(packagesDetail.packagesDetailId).subscribe(el => {
                        packagesDetail.tableElement = {
                            'tableHeaders': [],
                            'tableOp': [['修改', 'single_goods_for_modify'], ['删除', 'single_goods_delete']],
                            'tableContent': []
                        };
                        this.templateConfigList = this.filterResult(el.json());
                        if (this.templateConfigList !== null) {
                            packagesDetail.tableElement.tableHeaders = ['子套餐ID', '套餐包ID', '子套餐商品名称', '子套餐商品数量', '子套餐类型', '子商品单价', '创建时间'];
                            this.templateConfigList.forEach(es => {
                                const gmtCreated = this.datePipe.transform(es.gmtCreated, 'yyyy-MM-dd hh:mm:ss');
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
        let show: string;
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
            const result = this.filterResult(res.json());
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
            const result = this.filterResult(res.json());
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
            const result = this.filterResult(res.json());
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
            this.packageTypeList = this.filterResult(res.json());
        });
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

export class PxSummaryTableElement {
    face: string;
    value: string;
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
