import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {DatePipe} from '@angular/common';
import {CommonServie} from '../../../utils/common.servie';
import {EventService} from '../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';

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
                ['删除', 'system_provider_product_listener']],
            'tableContent': []
        };
        this.ftConfitService.getAllDiscountGoodsConfig(this.shopId).subscribe(res => {
            console.log('----------------->', res);
            this.templateConfigList = this.commonService.filterResult(res.json());
            this.tableElement.tableHeaders = ['商品ID', '商品名称', '折扣类型', '折扣值', '折扣人群类型', '配置状态', '最后修改时间'];

            if (this.templateConfigList !== null && this.templateConfigList !== undefined) {
                this.templateConfigList.forEach(e => {
                    const gmtExpired = this.datePipe.transform(e.gmtExpired, 'yyyy-MM-dd HH:mm:ss');
                    const gmtModified = this.datePipe.transform(e.gmtModified, 'yyyy-MM-dd HH:mm:ss');
                    this.tableElement.tableContent.push([e.goodsId, e.goodsTitle, e.discountType, e.discountValue, e.crowdType,
                        e.discountStatus, gmtExpired]);
                });
            }
        });
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
        this.eventBus.publish('system_provider', this.title);
    }

}
