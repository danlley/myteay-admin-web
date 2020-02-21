import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {DatePipe} from '@angular/common';
import {CommonServie} from '../../../utils/common.servie';
import {EventService} from '../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {TcDiscountGoodsConfigModel} from './addDisGoodsConf/disGoodsConfigItem/disGoodsConfigItem.component';

@Component({
    selector: 'app-system-discount-main',
    templateUrl: './disGoodsConf.component.html',
    styleUrls: ['./disGoodsConf.component.css']
})

/**
 * 原材料管理组件
 */
export class DisGoodsConfComponent implements OnInit {
    title = '原材料管理!';
    shopStatusList: any[];
    contactKey: string;
    templateConfigList: any[];
    shopId;
    shopData;

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
     */
    constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe, private commonService: CommonServie,
                public activeRoute: ActivatedRoute, private eventBus: EventService) {
        this.eventBus.registerySubject('system_discount_main_listener').subscribe(e => {
            console.log('原材料产品列表收到的参数详情--->', e);
            const arr = [];
            arr.push(this.shopData);
            arr.push(e);
            this.eventBus.publish('system_discount_main', e);
        });

        // 原材料管理页面跳转事件监听
        this.eventBus.registerySubject('system_discount_goods_conf_remove').subscribe(e => {
            this.removeDiscountGoodsConf(e);
        });

        const data = this.activeRoute.snapshot.queryParams['data'];
        if (data !== undefined && data !== '') {
            this.shopData = data.split(',');
            this.shopId = this.shopData[0];
            console.log('原材料管理：', this.shopData[0]);
        }
    }

    /**
     * 初始化组件
     */
    ngOnInit(): void {
        console.log(this.title);
        this.initShopStatusList();
        this.initShopList();
    }

    removeDiscountGoodsConf(e) {
        this.ftConfitService.removeDiscountGoodsConfigById(e).subscribe(res => {
            console.log('----------------->', res);
            this.initShopList();
        });
    }

    /**
     * 构建店铺信息列表，用于进入店铺进行相应的商品管理
     */
    initShopList() {
        this.tableElement = {
            'tableHeaders': [],
            'tableOp': [['上线', 'system_provider_product_detail_listener'],
                ['下架', 'system_provider_product_detail_listener'],
                ['删除', 'system_discount_goods_conf_remove']],
            'tableContent': []
        };
        this.ftConfitService.getAllDiscountGoodsConfig(this.shopId).subscribe(res => {
            console.log('----------------->', res);
            this.templateConfigList = this.commonService.filterResult(res.json());
            this.tableElement.tableHeaders = [ '折扣ID', '折扣名称', '商品ID', '折扣类型', '折扣值', '折扣人群类型', '配置状态', '起效时间', '过期时间', '备注'];

            if (this.templateConfigList !== null && this.templateConfigList !== undefined) {
                this.templateConfigList.forEach(e => {
                    const gmtExpired = this.datePipe.transform(e.gmtExpired, 'yyyy-MM-dd HH:mm:ss');
                    const tabEl = new TcDiscountGoodsConfigModel();
                    tabEl.discountId = e.discountId;
                    tabEl.comments = e.comments;
                    tabEl.discountName = e.discountName;
                    tabEl.shopId = e.shopId;
                    tabEl.goodsImage = e.goodsImage;
                    tabEl.goodsId = e.goodsId;
                    tabEl.discountValue = e.discountValue;
                    tabEl.crowdType = e.crowdType;
                    tabEl.gmtExpired = e.gmtExpired;
                    tabEl.discountStatus = e.discountStatus;
                    tabEl.gmtCreated = e.gmtCreated;
                    tabEl.gmtEffictive = e.gmtEffictive;
                    tabEl.gmtModified = e.gmtModified;
                    tabEl.discountType = e.discountType;
                    this.tableElement.tableContent.push(tabEl);
                });
            }
        });
    }

    /**
     * 向外发布异步事件，确保当前表格组件的引入者能够完成其目标动作
     *
     * @param currentTableElement   当前表格行中数据
     * @param operation             目标操作类型（VIEW_DETAIL, MODIFY_DETAIL, DELETE_DETAIL）
     */
    tableNoPaginatorOperation(currentTableElement, operation) {
        console.log('执行查询动作：  operation=' + operation, currentTableElement);
        this.eventBus.publish(operation, currentTableElement);
    }

    initShopStatusList() {
        this.ftConfitService.getDataDictionaryByKey('PxShopStatusEnum').subscribe(res => {
            this.shopStatusList = this.commonService.filterResult(res.json());
        });
    }

    gotoDiscountGoodsConfAddPage() {
        this.eventBus.publish('system_discount_main_add_listener', this.shopData);
    }

    goReturn() {
        this.eventBus.publish('system_discount', this.title);
    }

}
