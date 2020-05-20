import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {DatePipe} from '@angular/common';
import {CommonServie} from '../../../utils/common.servie';
import {EventService} from '../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-system-prodtrans-user-shop-prod-main',
    templateUrl: './prodtransUserShopProd.component.html',
    styleUrls: ['./prodtransUserShopProd.component.css']
})

/**
 * 店铺会员产品账管理组件
 */
export class ProdtransUserShopProdComponent implements OnInit {
    title = '店铺会员产品账管理!';
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
        this.eventBus.registerySubject('system_prodtrans_usr_shop_prod_listener').subscribe(e => {
            console.log('店铺会员产品账管理列表收到的参数详情--->', e);
            const arr = [];
            arr.push(this.shopData);
            arr.push(e);
            this.eventBus.publish('system_prodtrans_usr_shop_prod', e);
        });

        // 店铺会员产品账管理页面跳转事件监听
        this.eventBus.registerySubject('system_prodtrans_usr_shop_prod_remove').subscribe(e => {
            console.log('==============>', e)
            this.removePtsShopUserProdById(e.prodtransId);
        });

        // 店铺会员产品账管理页面跳转事件监听
        this.eventBus.registerySubject('system_prodtrans_usr_shop_prod_online_listener').subscribe(e => {
            this.changePtsShopUserProdStatus(e, 'TC_ONLINE');
        });

        // 店铺会员产品账管理页面跳转事件监听
        this.eventBus.registerySubject('system_prodtrans_usr_shop_prod_offline_listener').subscribe(e => {
            this.changePtsShopUserProdStatus(e, 'TC_OFFLINE');
        });

        const data = this.activeRoute.snapshot.queryParams['data'];
        if (data !== undefined && data !== '') {
            this.shopData = data.split(',');
            this.shopId = this.shopData[0];
            console.log('店铺会员产品账管理：', this.shopData[0]);
        }
    }

    /**
     * 初始化组件
     */
    ngOnInit(): void {
        console.log(this.title);
        this.initShopStatusList();
        this.initProdtransUsrShopProdList();
    }

    changePtsShopUserProdStatus(data: TcPtsUserShopProdConfigModel, ptsStatus: string) {
        data.ptsStatus = ptsStatus;
        this.ftConfitService.changePtsShopUserProdStatus(data).subscribe(res => {
            console.log('----------------->', res);
            this.initProdtransUsrShopProdList();
        });
    }

    removePtsShopUserProdById(prodtransId: string) {
        this.ftConfitService.removePtsShopUserProdById(this.shopId, prodtransId).subscribe(res => {
            console.log('----------------->', res);
            this.initProdtransUsrShopProdList();
        });
    }

    /**
     * 构建店铺会员产品账管理列表，用于进入店铺进行相应的店铺会员产品账管理
     */
    initProdtransUsrShopProdList() {
        this.tableElement = {
            'tableHeaders': [],
            'tableOp': [['上线', 'system_prodtrans_usr_shop_prod_online_listener'],
                ['下架', 'system_prodtrans_usr_shop_prod_offline_listener'],
                ['删除', 'system_prodtrans_usr_shop_prod_remove']],
            'tableContent': []
        };
        this.ftConfitService.getAllProdtransUsrShopProdConfig(this.shopId).subscribe(res => {
            console.log('----------------->', res);
            this.templateConfigList = this.commonService.filterResult(res.json());
            this.tableElement.tableHeaders = ['产品账ID', '产品账名称', '记账来源', '产品账类型', '额度', '配置状态', '起效时间', '过期时间', '修改时间'];

            if (this.templateConfigList !== null && this.templateConfigList !== undefined) {
                this.templateConfigList.forEach(e => {
                    const tabEl = new TcPtsUserShopProdConfigModel();
                    tabEl.prodtransId = e.prodtransId;
                    tabEl.shopId = e.shopId;
                    tabEl.prodtransName = e.prodtransName;
                    tabEl.bizSource = e.bizSource;
                    tabEl.prodtransType = e.prodtransType;
                    tabEl.overdrawn = e.overdrawn;
                    tabEl.ptsStatus = e.ptsStatus;
                    tabEl.gmtExpired = e.gmtExpired;
                    tabEl.gmtEffictive = e.gmtEffictive;
                    tabEl.gmtCreated = e.gmtCreated;
                    tabEl.gmtModified = e.gmtModified;
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

    gotoProdtransUserShopProdAddPage() {
        this.eventBus.publish('system_prodtrans_usr_shop_prod_add_listener', this.shopData);
    }

    goReturn() {
        this.eventBus.publish('system_prodtrans', this.title);
    }

}

export class TcPtsUserShopProdConfigModel {
    prodtransId;
    shopId;
    prodtransName;
    bizSource;
    prodtransType;
    overdrawn;
    ptsStatus;
    gmtExpired;
    gmtEffictive;
    gmtCreated;
    gmtModified;
}
