import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {CommonServie} from '../../../../utils/common.servie';
import {PxPackageDetailModel, PxSubPackagesModel} from '../../../../model/goods';
import {AutoCommitGoodsPackagesService} from '../../../../utils/autoCommitGoodsPackages.service';
import {PxSubPackagesTypeEnum} from '../../../../commons/enums/PxSubPackagesTypeEnum';

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

    isNeedShowErrMsg = false;
    errMsg = '';

    /**
     * 构建组件
     *
     * @param {FatigeConfigService} ftConfitService
     * @param {DatePipe} datePipe
     * @param {CommonServie} commonService
     * @param {AutoCommitGoodsPackagesService} autoCommitGoodsPackagesService
     * @param {ActivatedRoute} activeRoute
     * @param {EventService} eventBus
     */
    constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe, private commonService: CommonServie,
                private autoCommitGoodsPackagesService: AutoCommitGoodsPackagesService,
                public pxSubPackagesTypeEnum: PxSubPackagesTypeEnum,
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
        this.initPackagesDetailList();
    }

    /**
     * 初始化当前店铺及商品摘要信息
     */
    private initShopData() {
        this.shopData = this.activeRoute.snapshot.queryParams['shop'];
        console.log('=====--------->', this.shopData);

        this.goodsData = this.activeRoute.snapshot.queryParams['goods'];
        this.goodsId = this.goodsData[0];
        console.log('=====--------->', this.goodsData);
    }


    /**
     * 返回商品摘要列表页面
     */
    goReturn() {
        this.eventBus.publish('system_goods_manage_all', this.shopData);
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
            const result = this.commonService.filterResult(res);
            console.log('=====--------->', result);
            const data = res;
            this.errMsg = '';
            if (data.operateResult !== 'CAMP_OPERATE_SUCCESS') {
                this.isNeedShowErrMsg = true;
                this.errMsg = '删除子套餐信息出错---------> 错误码:' + data.errorCode + '　　　　　　错误详情:' + data.errorDetail;
            }
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
            const result = this.commonService.filterResult(res);
            console.log('开始过滤处理结果：', result);
            const data = res;
            this.errMsg = '';
            if (data.operateResult !== 'CAMP_OPERATE_SUCCESS') {
                this.isNeedShowErrMsg = true;
                this.errMsg = '追加子套餐信息出错---------> 错误码:' + data.errorCode + '　　　　　　错误详情:' + data.errorDetail;
            }
            this.subPackageData = new PxSubPackagesModel();
            this.initPackagesDetailList();
        });
    }

    /**
     * 查询当前商品下的所有套餐包及套餐包下的子套餐信息
     */
    initPackagesDetailList() {
        this.ftConfitService.getAllPacakgesDetailByGoodsId(this.goodsId).subscribe(res => {
            const tmpPackagesDetailList = this.commonService.filterResult(res);
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

                        const subPackagesList = this.commonService.filterResult(el);
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
        this.pxSubPackagesTypeEnum.values.forEach(t => {
            if (t[0] === packageType) {
                show = t[1];
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
            const result = this.commonService.filterResult(res);
            console.log('开始过滤处理结果：', result);
            const data = res;
            this.errMsg = '';
            if (data.operateResult !== 'CAMP_OPERATE_SUCCESS') {
                this.isNeedShowErrMsg = true;
                this.errMsg = '添加套餐包信息出错---------> 错误码:' + data.errorCode + '　　　　　　错误详情:' + data.errorDetail;
            }
            this.initPackagesDetailList();
        });
    }

    /**
     * 自动生成套餐模板
     */
    public gotoAutoAddPackages() {
        const pxPackageDetailModelList = this.autoCommitGoodsPackagesService.getPxPackageDetailModelList(this.goodsId);
        console.log('pxPackageDetailModelList：', pxPackageDetailModelList);
        if (pxPackageDetailModelList === undefined) {
            console.log('pxPackageDetailModelList 不可用，无法完成自动生成套餐模板');
            return;
        }
        const that = this;
        let time = 0;
        pxPackageDetailModelList.forEach(e => {
            time += 200;
            setTimeout(function () {
                that.ftConfitService.managePackagesDetail(e).subscribe(res => {
                    const result = that.commonService.filterResult(res);
                    console.log('开始过滤处理结果：', result);
                    const data = res;
                    this.errMsg = '';
                    if (data.operateResult !== 'CAMP_OPERATE_SUCCESS') {
                        this.isNeedShowErrMsg = true;
                        this.errMsg = '自动添加套餐信息出错---------> 错误码:' + data.errorCode + '　　　　　　错误详情:' + data.errorDetail;
                    }
                    if (data.operateResult === 'CAMP_OPERATE_SUCCESS') {
                        that.initPackagesDetailList();
                    }
                });
            }, time);
            console.log('8888888888889999999999000000000000==========--------=======》', e);
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
            const result = this.commonService.filterResult(res);
            console.log('开始过滤处理结果：', result);
            const data = res;
            this.errMsg = '';
            if (data.operateResult !== 'CAMP_OPERATE_SUCCESS') {
                this.isNeedShowErrMsg = true;
                this.errMsg = '修改套餐包信息出错---------> 错误码:' + data.errorCode + '　　　　　　错误详情:' + data.errorDetail;
            }
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
            const result = this.commonService.filterResult(res);
            console.log('=====--------->', result);
            const data = res;
            this.errMsg = '';
            if (data.operateResult !== 'CAMP_OPERATE_SUCCESS') {
                this.isNeedShowErrMsg = true;
                this.errMsg = '删除套餐信息出错---------> 错误码:' + data.errorCode + '　　　　　　错误详情:' + data.errorDetail;
            }
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

}
