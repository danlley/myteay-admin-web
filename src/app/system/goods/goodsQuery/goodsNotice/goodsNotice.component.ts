import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {CommonServie} from '../../../../utils/common.servie';

@Component({
    selector: 'app-query-goods-packages-notice',
    templateUrl: './goodsNotice.component.html',
    styleUrls: ['./goodsNotice.component.css']
})

export class GoodsNoticeComponent implements OnInit {

    title = '套餐包管理!';
    packagesNoticeList: PxPackageNoticeModel[] = [];

    shopData;
    goodsData;
    goodsId;
    packagesNoticeName;
    isNeedShowSubPackagesAdd = false;

    subPackageData = new PxPackageSubNoticeModel();

    tableElement = {
        'tableHeaders': [],
        'tableOp': [],
        'tableContent': []
    };

    constructor(private ftConfitService: FatigeConfigService, public datePipe: DatePipe,
                private commonService: CommonServie, public activeRoute: ActivatedRoute, private eventBus: EventService) {

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
    }

    doDeleteSubPackages(elements) {
        this.subPackageData.packagesSuNoticeId = elements;
        this.subPackageData.operationType = 'PX_DELETE';
        console.log('=======================>', this.subPackageData);
        this.ftConfitService.managePackagesSubNotice(this.subPackageData).subscribe(res => {
            const result = this.commonService.filterResult(res.json());
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
            const result = this.commonService.filterResult(res.json());
            this.subPackageData = new PxPackageSubNoticeModel();
            this.initGoodsList();
        });
    }

    initGoodsList() {
        // 套餐包
        this.ftConfitService.getAllPacakgesNoticeByGoodsId(this.goodsId).subscribe(res => {
            this.packagesNoticeList = this.commonService.filterResult(res.json());
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
            const result = this.commonService.filterResult(res.json());
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
            const result = this.commonService.filterResult(res.json());
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
            const result = this.commonService.filterResult(res.json());
            console.log('开始过滤处理结果：', result);
            this.initGoodsList();
        });
    }

    public addSubNoticePackages(elements): void {
        elements.isNeedShowSubPackagesAdd = !elements.isNeedShowSubPackagesAdd;
        elements.height = '190px';
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

export class PxPackageSubNoticeModel {
    packagesNoticeId: string;
    operationType = 'PX_ADD';
    packagesSuNoticeId: string;
    subNoticeDetail: string;
    gmtCreated: string;
    gmtModified: string;
}

