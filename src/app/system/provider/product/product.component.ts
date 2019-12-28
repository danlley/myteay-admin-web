import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {DatePipe} from '@angular/common';
import {CommonServie} from '../../../utils/common.servie';
import {EventService} from '../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-system-provider-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})

/**
 * 原材料管理组件
 */
export class ProductComponent implements OnInit {
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
        // 监听商品详情展示请求
        this.eventBus.registerySubject('system_provider_product_listener').subscribe(e => {
            console.log('原材料产品列表收到的参数详情--->', e);
            this.eventBus.publish('system_provider_product', e);
        });

        // 监听商品详情展示请求
        this.eventBus.registerySubject('system_provider_product_detail_listener').subscribe(e => {
            const arr = [];
            arr.push(this.shopData);
            arr.push(e);
            this.eventBus.publish('system_provider_product_detail', arr);
        });

        // 监听商品修改请求
        this.eventBus.registerySubject('system_provider_product_modify_listener').subscribe(e => {
            const arr = [];
            arr.push(this.shopData);
            arr.push(e);
            this.eventBus.publish('system_provider_product_modify', arr);
        });

        // 监听商品营养配比维护请求
        this.eventBus.registerySubject('system_provider_nutritional_listener').subscribe(e => {
            const arr = [];
            arr.push(this.shopData);
            arr.push(e);
            this.eventBus.publish('system_provider_nutritional', arr);
        });

        // 监听商品帮助手册维护请求
        this.eventBus.registerySubject('system_provider_manual_listener').subscribe(e => {
            const arr = [];
            arr.push(this.shopData);
            arr.push(e);
            this.eventBus.publish('system_provider_manual', arr);
        });

        // 监听商品询价维护请求
        this.eventBus.registerySubject('system_provider_price_listener').subscribe(e => {
            const arr = [];
            arr.push(this.shopData);
            arr.push(e);
            this.eventBus.publish('system_provider_price', arr);
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

    /**
     * 构建店铺信息列表，用于进入店铺进行相应的商品管理
     */
    initShopList() {
        this.tableElement = {
            'tableHeaders': [],
            'tableOp': [['详情', 'system_provider_product_detail_listener'],
                ['修改', 'system_provider_product_modify_listener'],
                ['删除', 'system_provider_product_listener'],
                ['图片维护', 'system_provider_images_listener'],
                ['配料维护', 'system_provider_nutritional_listener'],
                ['询价维护', 'system_provider_price_listener'],
                ['说明书维护', 'system_provider_manual_listener']],
            'tableContent': []
        };
        this.ftConfitService.getAllProductsConfig(this.shopId).subscribe(res => {
            console.log('----------------->', res);
            this.templateConfigList = this.commonService.filterResult(res.json());
            this.tableElement.tableHeaders = ['流水号', '原材料', '进货单位', '重量', '公司', '产地', '保存环境'];

            if (this.templateConfigList !== null && this.templateConfigList !== undefined) {
                this.templateConfigList.forEach(e => {
                    this.tableElement.tableContent.push([e.id, e.productName, '￥' + e.productPrice + '元/' + e.atomic, e.weight,
                        e.company, e.producingArea, e.storegeType]);
                });
            }
        });
    }

    initShopStatusList() {
        this.ftConfitService.getDataDictionaryByKey('PxShopStatusEnum').subscribe(res => {
            this.shopStatusList = this.commonService.filterResult(res.json());
        });
    }

    gotoProductAddPage() {
        this.eventBus.publish('system_provider_product_add_listener', this.shopData);
    }

    goReturn() {
        this.eventBus.publish('system_provider', this.title);
    }

}
