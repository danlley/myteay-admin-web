import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {DatePipe} from '@angular/common';
import {CommonServie} from '../../../../utils/common.servie';
import {EventService} from '../../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../../model/product';

@Component({
    selector: 'app-system-provider-product-add',
    templateUrl: './productAdd.component.html',
    styleUrls: ['./productAdd.component.css']
})

/**
 * 原材料新增组件
 */
export class ProductAddComponent implements OnInit {
    title = '原材料新增!';
    shopStatusList: any[];
    contactKey: string;
    templateConfigList: any[];
    shopId;
    shopData;
    product: Product = new Product();

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
        this.eventBus.registerySubject('system_provider_product_add_listener').subscribe(e => {
            this.eventBus.publish('system_provider_product_add', e);
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
    }


    doAddShopProduct() {
    }

    goReturn() {
        this.eventBus.publish('system_provider_product_listener', this.shopData);
    }
}
