import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {PxGoodsConfigModel} from '../../../model/goods';
import {CommonServie} from '../../../utils/common.servie';

@Component({
    selector: 'app-query-goods',
    templateUrl: './goodsQuery.component.html',
    styleUrls: ['./goodsQuery.component.css']
})

/**
 * 商品管理组件
 */
export class GoodsQueryComponent implements OnInit {

    title = '商品管理!';

    // 当前店铺信息
    shopData;

    // 商品摘要信息展示列表数据结构
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

        // 监听商品详情展示请求
        this.eventBus.registerySubject('system_goods_for_view_detail').subscribe(e => {
            const sendData = [this.shopData, e[0]];
            console.log('表格操作目标（详情）：', sendData);
            this.eventBus.publish('system_goods_view_detail', sendData);
        });

        // 监听商品发布请求
        this.eventBus.registerySubject('system_goods_view_for_active').subscribe(e => {
            const sendData = [this.shopData, e[0]];
            console.log('表格操作目标（详情）：', sendData);
            this.eventBus.publish('system_goods_view_active', sendData);
        });

        // 监听商品下架请求
        this.eventBus.registerySubject('system_goods_view_for_inactive').subscribe(e => {
            const sendData = [this.shopData, e[0]];
            console.log('表格操作目标（详情）：', sendData);
            this.eventBus.publish('system_goods_view_inactive', sendData);
        });

        // 监听商品概要信息修改请求
        this.eventBus.registerySubject('single_goods_for_modify').subscribe(e => {
            const sendData = [this.shopData, e[0]];
            console.log('表格操作目标（修改）：', sendData);
            this.eventBus.publish('system_goods_modify', sendData);
        });

        // 监听套餐包维护请求
        this.eventBus.registerySubject('system_goods_packages_for_all').subscribe(e => {
            const sendData = [this.shopData, e];
            console.log('表格操作目标（维护）：', sendData);
            this.eventBus.publish('system_goods_packages_all', sendData);
        });

        // 监听温馨提醒维护请求
        this.eventBus.registerySubject('system_goods_packages_notice_for_all').subscribe(e => {
            const sendData = [this.shopData, e];
            console.log('表格操作目标（温馨提醒维护）：', sendData);
            this.eventBus.publish('system_goods_packages_notice_all', sendData);
        });

        // 监听商品详情图片维护请求
        this.eventBus.registerySubject('system_goods_packages_image_for_all').subscribe(e => {
            const sendData = [this.shopData, e];
            console.log('表格操作目标（套餐详情图片）：', sendData);
            this.eventBus.publish('system_goods_packages_image_all', sendData);
        });

        // 监听商品概要删除请求
        this.eventBus.registerySubject('single_goods_delete').subscribe(e => {
            console.log('表格操作目标（删除）：', e[0]);
            this.deleteSingleGoods(e[0]);
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

    /**
     * 删除商品
     *
     * @param {number} goodsId
     */
    deleteSingleGoods(goodsId: number) {
        const deleteData = new PxGoodsConfigModel();
        deleteData.goodsId = goodsId;
        deleteData.operationType = 'PX_DELETE';
        console.log('=======================>', deleteData);
        this.ftConfitService.manageGoodsConfig(deleteData).subscribe(res => {
            console.log('=======================>', res.json());
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
                ['套餐提醒维护', 'system_goods_packages_notice_for_all'],
                ['发布', 'system_goods_view_for_active'], ['下架', 'system_goods_view_for_inactive'], ['详情', 'system_goods_for_view_detail'],
                ['修改', 'single_goods_for_modify'], ['删除', 'single_goods_delete']
            ],
            'tableContent': []
        };

        let goodsStatusList = [];
        this.ftConfitService.getDataDictionaryByKey('PxGoodsStatusEnum').subscribe(res5 => {
            goodsStatusList = this.commonService.filterResult(res5.json());
        });
        this.ftConfitService.getAllGoodsByShopId(this.shopData[0]).subscribe(res => {
            const goodsList = this.commonService.filterResult(res.json());
            this.tableElement.tableHeaders = ['流水号', '商品名称', '套餐信息类型', '当前售价', '商品当前状态', '过期时间', '创建时间'];
            goodsList.forEach(e => {
                const gmtCreated = this.datePipe.transform(e.gmtCreated, 'yyyy-MM-dd HH:mm:ss');
                const gmtExpired = this.datePipe.transform(e.gmtExpired, 'yyyy-MM-dd HH:mm:ss');
                let goodsStatus = e.goodsStatus;
                if (goodsStatusList !== null) {
                    goodsStatusList.forEach(s => {
                        if (s.bizKey === e.goodsStatus) {
                            goodsStatus = s.value;
                        }
                    });
                }
                this.tableElement.tableContent.push([e.goodsId, e.goodsTitle, e.goodsDesc, e.goodsPrice, goodsStatus,
                    gmtExpired, gmtCreated]);
            });
        });
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

