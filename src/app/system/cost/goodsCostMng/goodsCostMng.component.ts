import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {CommonServie} from '../../../utils/common.servie';

@Component({
    selector: 'app-query-goods-cost-mng',
    templateUrl: './goodsCostMng.component.html',
    styleUrls: ['./goodsCostMng.component.css']
})

/**
 * 商品管理组件
 */
export class GoodsCostMngComponent implements OnInit {

    title = '商品管理!';

    // 当前店铺信息
    shopData;

    // 商品摘要信息展示列表数据结构
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
     * @param {ActivatedRoute} activeRoute
     * @param {EventService} eventBus
     */
    constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe, private commonService: CommonServie,
                public activeRoute: ActivatedRoute, private eventBus: EventService) {

        // 监听商品详情展示请求
        this.eventBus.registerySubject('system_goods_cost_mng_listener').subscribe(e => {
            const sendData = [this.shopData, e[0]];
            console.log('表格操作目标（详情）：', sendData);
            this.eventBus.publish('system_goods_cost_mng', sendData);
        });

    }

    /**
     * 初始化当前组件
     */
    ngOnInit(): void {
        this.shopData = this.commonService.initShopData(this.activeRoute.snapshot.queryParams['data']);
        console.log('=====--------->', this.shopData);

        this.initGoodsPackagesList();
    }


    doQuery() {
        this.errMsg = '';
        this.isNeedShowErrMsg = false;
        this.initGoodsPackagesList();
    }

    /**
     * 删除商品
     *
     * @param {number} goodsId
     */
    deleteSingleGoods(goodsId: number) {
        const formData: FormData = new FormData();
        formData.append('goodsId', goodsId);
        formData.append('operationType', 'PX_DELETE');
        this.ftConfitService.manageGoodsConfig(formData).subscribe(res => {
            console.log('=======================>', res.json());
            const data = res.json();
            this.errMsg = '';
            if (data.operateResult !== 'CAMP_OPERATE_SUCCESS') {
                this.isNeedShowErrMsg = true;
                this.errMsg = '删除商品出错---------> 错误码:' + data.errorCode + '　　　　　　错误详情:' + data.errorDetail;
            }
            this.initGoodsPackagesList();
        });
    }

    /**
     * 初始化商品概要列表表格展示数据
     */
    initGoodsPackagesList() {
        this.tableElement = {
            'tableHeaders': [],
            'tableOp': [
                ['子套餐维护', 'system_goods_packages_for_all'],
                ['详情图片维护', 'system_goods_packages_image_for_all'],
                ['温馨提醒维护', 'system_goods_packages_notice_for_all'],
                ['发布', 'system_goods_view_for_active'], ['下架', 'system_goods_view_for_inactive'], ['详情', 'system_goods_for_view_detail'],
                ['修改', 'single_goods_for_modify'], ['删除', 'single_goods_delete']
            ],
            'tableContent': []
        };

        let goodsStatusList = [];
        this.ftConfitService.getDataDictionaryByKey('PxGoodsStatusEnum').subscribe(res5 => {
            goodsStatusList = this.commonService.filterResult(res5.json());
        });

        const that = this;
        const time = 300;
        setTimeout(function () {
            that.ftConfitService.getAllGoodsByShopId(that.shopData[0]).subscribe(res => {
                const goodsList = that.commonService.filterResult(res.json());
                that.tableElement.tableHeaders = ['流水号', '商品名称', '套餐信息类型', '当前售价', '商品当前状态', '过期时间', '创建时间'];
                goodsList.forEach(e => {
                    const gmtCreated = that.datePipe.transform(e.gmtCreated, 'yyyy-MM-dd HH:mm:ss');
                    const gmtExpired = that.datePipe.transform(e.gmtExpired, 'yyyy-MM-dd HH:mm:ss');
                    let goodsStatus = e.goodsStatus;
                    if (goodsStatusList !== null) {
                        goodsStatusList.forEach(s => {
                            if (s.bizKey === e.goodsStatus) {
                                goodsStatus = s.value;
                            }
                        });
                    }
                    that.tableElement.tableContent.push([e.goodsId, e.goodsTitle, e.goodsDesc, e.goodsPrice, goodsStatus,
                        gmtExpired, gmtCreated]);
                });
            });
        }, time + '');
    }

    /**
     * 进入商品概要信息添加页面
     */
    public gotoAddGoods(): void {
        this.eventBus.publish('system_goods_add', this.shopData);
    }

    /**
     * 返回商品摘要列表页面
     */
    goReturn() {
        this.eventBus.publish('system_goods_manage', this.shopData);
    }
}

