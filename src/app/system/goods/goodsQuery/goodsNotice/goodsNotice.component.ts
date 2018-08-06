import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-query-goods-packages-notice',
    templateUrl: './goodsNotice.component.html',
    styleUrls: ['./goodsNotice.component.css']
})

export class GoodsNoticeComponent implements OnInit {

    title = '套餐包管理!';
    ftConfitService: FatigeConfigService;
    packagesNoticeList: PxPackageNoticeModel[] = [];

    shopData;
    goodsData;
    summaryTableElement: any[];
    goodsId;
    packagesNoticeName;
    isNeedShowSubPackagesAdd = false;

    subPackageData = new PxPackageSubNoticeModel();


    tableElement = {
        'tableHeaders': [],
        'tableOp': [],
        'tableContent': []
    };

    constructor(ftConfitService: FatigeConfigService, public datePipe: DatePipe,
                public activeRoute: ActivatedRoute, private eventBus: EventService) {
        this.ftConfitService = ftConfitService;

        this.eventBus.registerySubject('single_sub_packages_for_delete').subscribe(e => {
            console.log('表格操作目标（删除）：', e);
            this.doDeleteSubPackages(e[0]);
        });
    }

    ngOnInit(): void {
        this.initShopData();
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

    doDeleteSubPackages(elements) {
        this.subPackageData.packagesSuNoticeId = elements;
        this.subPackageData.operationType = 'PX_DELETE';
        console.log('=======================>', this.subPackageData);
        this.ftConfitService.managePackagesSubNotice(this.subPackageData).subscribe(res => {
            const result = this.filterResult(res.json());
            this.initGoodsList();
        });
    }

    doAddSubPackages(elements) {

        if (elements === undefined) {
            console.log('当前温馨提醒分类信息不可用elements is null! ');
            return;
        }

        this.subPackageData.packagesNoticeId = elements.packagesNoticeId;
        console.log('=======================>', this.subPackageData);
        this.ftConfitService.managePackagesSubNotice(this.subPackageData).subscribe(res => {
            const result = this.filterResult(res.json());
            this.subPackageData = new PxPackageSubNoticeModel();
            this.initGoodsList();
        });
    }

    initGoodsList() {
        // 套餐包
        this.ftConfitService.getAllPacakgesNoticeByGoodsId(this.goodsId).subscribe(res => {
            this.packagesNoticeList = this.filterResult(res.json());
            console.log('packagesNoticeList：', this.packagesNoticeList);
        });
    }


    public gotoAddPackageNotice(): void {
        console.log('--------packagesNoticeName------------>', this.packagesNoticeName);

        const packagesDetail = new PxPackageNoticeModel();
        packagesDetail.goodsId = this.goodsId;
        packagesDetail.packagesNoticeName = this.packagesNoticeName;
        packagesDetail.operationType = 'PX_ADD';
        this.ftConfitService.managePackagesNotice(packagesDetail).subscribe(res => {
            const result = this.filterResult(res.json());
            console.log('开始过滤处理结果：', result);
            this.initGoodsList();
        });
    }

    public modifyPackagesNotice(elements): void {
        console.log('--------goodsPackagesDetailNameModified------------>', elements.goodsPackagesDetailNameModified);

        const packagesDetail = new PxPackageNoticeModel();
        packagesDetail.goodsId = this.goodsId;
        packagesDetail.packagesNoticeName = elements.goodsPackagesDetailNameModified;
        packagesDetail.operationType = 'PX_MODIFY';
        packagesDetail.packagesNoticeId = elements.packagesNoticeId;
        this.ftConfitService.managePackagesNotice(packagesDetail).subscribe(res => {
            const result = this.filterResult(res.json());
            console.log('开始过滤处理结果：', result);
            this.initGoodsList();
        });
    }

    public deletePackagesNotice(elements): void {
        console.log('--------elements------------>', elements);

        const packagesDetail = new PxPackageNoticeModel();
        packagesDetail.goodsId = this.goodsId;
        packagesDetail.packagesNoticeName = elements.packagesNoticeName;
        packagesDetail.operationType = 'PX_DELETE';
        packagesDetail.packagesNoticeId = elements.packagesNoticeId;
        this.ftConfitService.managePackagesNotice(packagesDetail).subscribe(res => {
            const result = this.filterResult(res.json());
            console.log('开始过滤处理结果：', result);
            this.initGoodsList();
        });
    }

    public addSubNoticePackages(elements): void {
        elements.isNeedShowSubPackagesAdd = !elements.isNeedShowSubPackagesAdd;
        elements.height = '190px';
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

export class PxPackageNoticeModel {
    packagesNoticeId: string;
    operationType = 'PX_ADD';
    goodsId: string;
    packagesNoticeName: string;
    gmtCreated: string;
    gmtModified: string;
}

export class PxPackageSubNoticeModel {
    packagesNoticeId: string;
    operationType = 'PX_ADD';
    packagesSuNoticeId: string;
    subNoticeDetail: string;
    gmtCreated: string;
    gmtModified: string;
}

