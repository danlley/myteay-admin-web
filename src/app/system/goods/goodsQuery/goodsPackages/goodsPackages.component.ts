import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {CommonServie} from '../../../../utils/common.servie';
import {PxPackageDetailModel, PxSubPackagesModel} from '../../../../model/goods';

@Component({
    selector: 'app-query-goods-packages',
    templateUrl: './goodsPackages.component.html',
    styleUrls: ['./goodsPackages.component.css']
})

/**
 * 套餐包管理组件
 */
export class GoodsPackagesComponent implements OnInit {

    title = '套餐包管理';

    // 用于展示子套餐类型列表
    packageTypeList: any[];

    // 套餐列表
    packagesDetailsList: PxPackageDetailModel[] = [];

    // 当前店铺及商品信息
    shopData;
    goodsData;
    goodsId;

    // 套餐包名称，用于添加套餐包
    goodsPackagesDetailName;

    // 套餐包名称，用于修改套餐包
    goodsPackagesDetailNameModified;

    // 确定是否展示子套餐添加表单
    isNeedShowSubPackagesAdd = false;

    // 用于子套餐内容添加
    subPackageData: PxSubPackagesModel = new PxSubPackagesModel();

    tableElement = {
        'tableHeaders': [],
        'tableOp': [],
        'tableContent': []
    };

    /**
     * 构建组件
     *
     * @param {FatigeConfigService} ftConfitService
     * @param {DatePipe} datePipe
     * @param {CommonServie} commonService
     * @param {ActivatedRoute} activeRoute
     * @param {EventService} eventBus
     */
    constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe, private commonService: CommonServie,
                public activeRoute: ActivatedRoute, private eventBus: EventService) {
        this.eventBus.registerySubject('single_sub_packages_for_delete').subscribe(e => {
            console.log('表格操作目标（删除）：', e);
            this.doDeleteSubPackages(e[0]);
        });
    }

    /**
     * 初始化当前组件
     */
    ngOnInit(): void {
        this.initShopData();
        this.initPackagesTypeList();
        this.initPackagesDetailList();
    }

    /**
     * 初始化当前店铺及商品摘要信息
     */
    private initShopData() {
        this.shopData = this.commonService.initShopData(this.activeRoute.snapshot.queryParams['shop']);
        console.log('=====--------->', this.shopData);

        this.goodsData = this.commonService.initShopData(this.activeRoute.snapshot.queryParams['goods']);
        this.goodsId = this.goodsData[0];
        console.log('=====--------->', this.goodsData);
    }

    /**
     * 删除子套餐
     *
     * @param elements
     */
    doDeleteSubPackages(elements) {
        this.subPackageData = new PxSubPackagesModel();
        this.subPackageData.subPackagesId = elements;
        this.subPackageData.operationType = 'PX_DELETE';
        console.log('=======================>', this.subPackageData);
        this.ftConfitService.manageSubPackages(this.subPackageData).subscribe(res => {
            const result = this.commonService.filterResult(res.json());
            console.log('开始过滤处理结果：', result);
            this.subPackageData = new PxSubPackagesModel();
            this.initPackagesDetailList();
        });
    }

    /**
     * 添加子套餐
     *
     * @param elements
     */
    doAddSubPackages(elements) {
        this.subPackageData.packagesDetailId = elements.packagesDetailId;
        this.subPackageData.operationType = 'PX_ADD';
        console.log('=======================>', this.subPackageData);
        this.ftConfitService.manageSubPackages(this.subPackageData).subscribe(res => {
            const result = this.commonService.filterResult(res.json());
            console.log('开始过滤处理结果：', result);
            this.subPackageData = new PxSubPackagesModel();
            this.initPackagesDetailList();
        });
    }

    /**
     * 查询当前商品下的所有套餐包及套餐包下的子套餐信息
     */
    initPackagesDetailList() {
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

                        const subPackagesList = this.commonService.filterResult(el.json());
                        if (subPackagesList !== null) {
                            packagesDetail.tableElement.tableHeaders = ['子套餐ID', '套餐包ID', '子套餐商品名称', '子套餐商品数量', '子套餐类型', '子商品单价', '创建时间'];
                            subPackagesList.forEach(es => {
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

    /**
     * 获取表格展示数据（用于展示子套餐的套餐类型）
     *
     * @param {string} packageType
     * @returns {string}
     */
    private getPackageTypeShow(packageType: string): string {
        let show = '';
        this.packageTypeList.forEach(t => {
            if (t.bizKey === packageType) {
                show = t.value;
            }
        });

        return show;
    }

    /**
     * 添加套餐信息
     */
    public gotoAddPackageDetail(): void {
        console.log('--------goodsPackagesDetailName------------>', this.goodsPackagesDetailName);

        const packagesDetail = new PxPackageDetailModel();
        packagesDetail.goodsId = this.goodsId;
        packagesDetail.packageDetailName = this.goodsPackagesDetailName;
        packagesDetail.operationType = 'PX_ADD';
        this.ftConfitService.managePackagesDetail(packagesDetail).subscribe(res => {
            const result = this.commonService.filterResult(res.json());
            console.log('开始过滤处理结果：', result);
            this.initPackagesDetailList();
        });
    }

    /**
     * 修改套餐信息
     *
     * @param elements
     */
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
            this.initPackagesDetailList();
        });
    }

    /**
     * 删除套餐信息
     *
     * @param elements
     */
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
            this.initPackagesDetailList();
        });
    }

    /**
     * 添加子套餐信息
     *
     * @param elements
     */
    public addSubPackages(elements): void {
        elements.isNeedShowSubPackagesAdd = !elements.isNeedShowSubPackagesAdd;
        elements.height = '190px';
    }

    /**
     * 初始化套餐类型可选值列表
     */
    initPackagesTypeList() {
        this.ftConfitService.getDataDictionaryByKey('PxSubPackagesTypeEnum').subscribe(res => {
            this.packageTypeList = this.commonService.filterResult(res.json());
        });
    }
}
