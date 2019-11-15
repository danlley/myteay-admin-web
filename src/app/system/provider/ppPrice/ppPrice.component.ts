import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {DatePipe} from '@angular/common';
import {CommonServie} from '../../../utils/common.servie';
import {EventService} from '../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-system-provider-price',
    templateUrl: './ppPrice.component.html',
    styleUrls: ['./ppPrice.component.css']
})

/**
 * 原材料管理组件
 */
export class PpPriceComponent implements OnInit {
    title = '原材料管理!';
    shopStatusList: any[];
    contactKey: string;
    templateConfigList: any[];
    shopId;
    shopData;
    param;
    saveData: ProviderProductPrice = new ProviderProductPrice();

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
        this.eventBus.registerySubject('system_provider_product_price_del_listener').subscribe(e => {
            console.log('e===---==->', e);
            this.param = e;

            const data = new ProviderProductPrice();
            data.id = e[0];
            data.productId = e[1];
            data.productPrice = e[2];
            data.productProvider = e[3];
            data.operationType = 'PX_DELETE';
            this.gotoProductPriceDelPage(data);
        });


        const data = this.activeRoute.snapshot.queryParams['data'];
        if (data !== undefined && data !== '') {
            this.shopData = data.split(',');
            this.shopId = this.shopData[0];
            this.saveData.productId = this.shopData[7];
            console.log('原材料管理：', this.saveData);
        }
    }

    /**
     * 初始化组件
     */
    ngOnInit(): void {
        console.log(this.title);
        this.initShopStatusList();
        this.initProductPriceList();
    }

    /**
     * 构建店铺信息列表，用于进入店铺进行相应的商品管理
     */
    initProductPriceList() {
        this.tableElement = {
            'tableHeaders': [],
            'tableOp': [['删除', 'system_provider_product_price_del_listener']],
            'tableContent': []
        };
        this.ftConfitService.queryProductPriceConfigAll(this.saveData.productId).subscribe(res => {
            console.log('----------------->', res);
            this.templateConfigList = this.commonService.filterResult(res.json());
            this.tableElement.tableHeaders = ['报价序号', '产品序号',  '价格（元）', '报价单位', '创建时间', '最后修改时间'];

            if (this.templateConfigList !== null && this.templateConfigList !== undefined) {
                this.templateConfigList.forEach(e => {
                    this.tableElement.tableContent.push([e.id, e.productId, e.productPrice, e.productProvider,
                        e.gmtCreated, e.gmtModified]);
                });
            }
        });
    }

    initShopStatusList() {
        this.ftConfitService.getDataDictionaryByKey('PxShopStatusEnum').subscribe(res => {
            this.shopStatusList = this.commonService.filterResult(res.json());
        });
    }

    gotoProductPriceAddPage() {
        console.log('----------------->', this.saveData);

        if (this.saveData.productProvider === undefined || this.saveData.productPrice === undefined) {
            console.log('产品询价参数异常，无法保存--->', this.saveData);
            return ;
        }

        this.ftConfitService.manageProductPriceConfig(this.saveData).subscribe(res => {
            console.log('----------------->', res);
            this.initProductPriceList();
        });
    }

    gotoProductPriceDelPage(data) {
        console.log('----------------->', data);
        this.ftConfitService.manageProductPriceConfig(data).subscribe(res => {
            console.log('------res----------->', res);
            this.initProductPriceList();
        });
    }

    goReturn() {
        const mydata = [];
        mydata[0] = this.shopData[0];
        mydata[1] = this.shopData[1];
        mydata[2] = this.shopData[2];
        mydata[3] = this.shopData[3];
        mydata[4] = this.shopData[4];
        mydata[5] = this.shopData[5];
        mydata[6] = this.shopData[6];
        this.eventBus.publish('system_provider_product_listener', mydata);
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

}


export class ProviderProductPrice {
    id;
    productId;
    productPrice;
    operationType = 'PX_ADD';
    productProvider;
    gmtCreated;
    gmtModified;
}
