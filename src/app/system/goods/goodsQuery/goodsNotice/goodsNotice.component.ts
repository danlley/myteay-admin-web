import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {CommonServie} from '../../../../utils/common.servie';
import {PxPackageNoticeModel, PxPackageSubNoticeModel} from '../../../../model/goods';
import {AutoCommitGoodsNoticeService} from '../../../../utils/autoCommitGoodsNotice.service';


@Component({
    selector: 'app-query-goods-packages-notice',
    templateUrl: './goodsNotice.component.html',
    styleUrls: ['./goodsNotice.component.css']
})

/**
 * 温馨提醒管理组件
 */
export class GoodsNoticeComponent implements OnInit {

    title = '温馨提醒管理';

    // 温馨提醒分类列表
    packagesNoticeList: PxPackageNoticeModel[] = [];

    // 店铺信息，用于识别当前操作数据所在店铺
    shopData;

    // 商品摘要信息，用于识别当前操作数据所在商品
    goodsData;

    // 当前操作的商品ID
    goodsId;

    // 温馨提醒分类名称（用于新增温馨提醒）
    packagesNoticeName;

    // 用来决定是否展示温馨提醒子项
    isNeedShowSubPackagesAdd = false;

    // 用于保存温馨提醒子项
    subPackageData = new PxPackageSubNoticeModel();

    // 表格结构信息
    tableElement = {
        'tableHeaders': [],
        'tableOp': [],
        'tableContent': []
    };

    isNeedShowErrMsg = false;
    errMsg = '';

    /**
     * 组件构造
     *
     * @param {FatigeConfigService} ftConfitService
     * @param {DatePipe} datePipe
     * @param {AutoCommitGoodsNoticeService} autoCommitGoodsNoticeService
     * @param {CommonServie} commonService
     * @param {ActivatedRoute} activeRoute
     * @param {EventService} eventBus
     */
    constructor(private ftConfitService: FatigeConfigService, public datePipe: DatePipe,
                private autoCommitGoodsNoticeService: AutoCommitGoodsNoticeService,
                private commonService: CommonServie, public activeRoute: ActivatedRoute, private eventBus: EventService) {

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
        this.initPackagesNoticeList();
    }

    /**
     * 收取删除子提醒的删除提示信息，并进行回显
     *
     * @param $event
     */
    showSubCertainMessage($event) {
        console.log('----------------->', $event);
        this.isNeedShowErrMsg = $event.isNeedShowErrMsg;
        this.errMsg = $event.errMsg;
    }

    /**
     * 初始化当前店铺及商品相关信息，用于做操作提示
     */
    private initShopData() {
        this.shopData = this.commonService.initShopData(this.activeRoute.snapshot.queryParams['shop']);
        console.log('=====--------->', this.shopData);

        this.goodsData = this.commonService.initShopData(this.activeRoute.snapshot.queryParams['goods']);
        this.goodsId = this.goodsData[0];
        console.log('=====--------->', this.goodsData);
    }

    /**
     * 删除当前提醒子项
     *
     * @param elements
     */
    doDeleteSubPackages(elements) {
        this.subPackageData.packagesSuNoticeId = elements;
        this.subPackageData.operationType = 'PX_DELETE';
        console.log('=======================>', this.subPackageData);
        this.ftConfitService.managePackagesSubNotice(this.subPackageData).subscribe(res => {
            const data = res.json();
            console.log('data-----------result---->', res);
            this.errMsg = '';
            if (data.operateResult !== 'CAMP_OPERATE_SUCCESS') {
                this.isNeedShowErrMsg = true;
                this.errMsg = '删除子提醒信息出错---------> 错误码:' + data.errorCode + '　　　　　　错误详情:' + data.errorDetail;
            }
            this.initPackagesNoticeList();
        });
    }

    /**
     * 添加提醒子项
     *
     * @param elements
     */
    doAddSubPackages(elements) {

        if (elements === undefined) {
            console.log('当前温馨提醒分类信息不可用elements is null! ');
            return;
        }

        this.subPackageData.packagesNoticeId = elements.packagesNoticeId;
        this.subPackageData.operationType = 'PX_ADD';
        console.log('=======================>', this.subPackageData);
        this.ftConfitService.managePackagesSubNotice(this.subPackageData).subscribe(res => {
            const result = this.commonService.filterResult(res.json());
            this.subPackageData = new PxPackageSubNoticeModel();
            this.initPackagesNoticeList();
        });
    }

    /**
     * 查询当前商品下的所有提醒分类
     */
    initPackagesNoticeList() {
        // 套餐包
        this.ftConfitService.getAllPacakgesNoticeByGoodsId(this.goodsId).subscribe(res => {
            this.packagesNoticeList = this.commonService.filterResult(res.json());
            console.log('packagesNoticeList：', this.packagesNoticeList);
        });
    }

    /**
     * 返回商品摘要列表页面
     */
    goReturn() {
        this.eventBus.publish('system_goods_manage_all', this.shopData);
    }

    /**
     * 添加提醒分类
     */
    public gotoAddPackageNotice(): void {
        console.log('--------packagesNoticeName------------>', this.packagesNoticeName);

        const packagesDetail = new PxPackageNoticeModel();
        packagesDetail.goodsId = this.goodsId;
        packagesDetail.packagesNoticeName = this.packagesNoticeName;
        packagesDetail.operationType = 'PX_ADD';
        this.ftConfitService.managePackagesNotice(packagesDetail).subscribe(res => {
            const result = this.commonService.filterResult(res.json());
            console.log('开始过滤处理结果：', result);
            const data = res.json();
            this.errMsg = '';
            if (data.operateResult !== 'CAMP_OPERATE_SUCCESS') {
                this.isNeedShowErrMsg = true;
                this.errMsg = '追加温馨提醒分类信息出错---------> 错误码:' + data.errorCode + '　　　　　　错误详情:' + data.errorDetail;
            }
            this.packagesNoticeName = '';
            this.initPackagesNoticeList();
        });
    }

    /**
     * 自动添加提醒分类
     */
    public gotoAutoAddPackageNotice(): void {
        const goodsPackagesNoticeList = this.autoCommitGoodsNoticeService.getGoodsPackagesNoticeList(this.goodsId);
        console.log('--------goodsPackagesNoticeList------------>', goodsPackagesNoticeList);
        if (goodsPackagesNoticeList === undefined) {
            console.log('无法执行保存模板动作');
            return;
        }

        const that = this;
        let time = 0;
        goodsPackagesNoticeList.forEach(e => {
            time += 200;
            setTimeout(function () {
                that.ftConfitService.managePackagesNotice(e).subscribe(res => {
                    const result = that.commonService.filterResult(res.json());
                    console.log('packagesNoticeId：', result.packagesNoticeId);
                    const packagesNoticeId = result.packagesNoticeId;
                    const goodsPackagesSubNoticeList = e.goodsPackagesSubNoticeList;
                    if (goodsPackagesSubNoticeList !== undefined) {
                        let time1 = 0;
                        goodsPackagesSubNoticeList.forEach(s => {
                            time1 += 200;
                            s.packagesNoticeId = packagesNoticeId;
                            setTimeout(function () {
                                that.ftConfitService.managePackagesSubNotice(s).subscribe(res1 => {
                                    const result1 = that.commonService.filterResult(res1.json());
                                    that.initPackagesNoticeList();
                                });
                            }, time1 + '');
                        });
                    }
                });
            }, time + '');
        });

        this.initPackagesNoticeList();
    }

    /**
     * 修改提醒分类
     *
     * @param elements
     */
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
            const data = res.json();
            this.errMsg = '';
            if (data.operateResult !== 'CAMP_OPERATE_SUCCESS') {
                this.isNeedShowErrMsg = true;
                this.errMsg = '修改温馨提醒分类信息出错---------> 错误码:' + data.errorCode + '　　　　　　错误详情:' + data.errorDetail;
            }
            this.initPackagesNoticeList();
        });
    }

    /**
     * 删除提醒分类
     *
     * @param elements
     */
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
            const data = res.json();
            this.errMsg = '';
            if (data.operateResult !== 'CAMP_OPERATE_SUCCESS') {
                this.isNeedShowErrMsg = true;
                this.errMsg = '删除温馨提醒出错---------> 错误码:' + data.errorCode + '　　　　　　错误详情:' + data.errorDetail;
            }
            this.initPackagesNoticeList();
        });
    }

    /**
     * 确定是否展示提醒子项添加表单
     *
     * @param elements
     */
    public addSubNoticePackages(elements): void {
        elements.isNeedShowSubPackagesAdd = !elements.isNeedShowSubPackagesAdd;
        elements.height = '190px';
    }

}



