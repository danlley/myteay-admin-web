import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {DatePipe} from '@angular/common';
import {CommonServie} from '../../../../utils/common.servie';
import {EventService} from '../../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';

declare const laydate;

@Component({
    selector: 'app-system-prodtrans-user-shop-prod-add',
    templateUrl: './prodtransUserShopProdAdd.component.html',
    styleUrls: ['./prodtransUserShopProdAdd.component.css']
})

/**
 * 原材料新增组件
 */
export class ProdtransUserShopProdAddComponent implements OnInit {
    title = '原材料新增!';
    shopId;
    shopData;
    errMsg;
    isNeedShowErrMsg;

    prodtransTypeOption;

    tcPtsUserShopProdConfig: TcPtsUserShopProdConfigModel = new TcPtsUserShopProdConfigModel();

    /**
     * 构建组件
     *
     * @param {FatigeConfigService} ftConfitService
     * @param {DatePipe} datePipe
     * @param {CommonServie} commonService
     */
    constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe, private commonService: CommonServie,
                public activeRoute: ActivatedRoute, private eventBus: EventService) {
        // 新增店铺会员产品账信息
        this.eventBus.registerySubject('system_prodtrans_usr_shop_prod_add_listener').subscribe(e => {
            console.log('新增店铺会员产品账信息--------------', e);
            this.eventBus.publish('system_prodtrans_usr_shop_prod_add', e);
        });

        const data = this.activeRoute.snapshot.queryParams['data'];
        if (data !== undefined && data !== '') {
            this.shopData = data.split(',');
            this.shopId = this.shopData[0];
            console.log('新增店铺会员产品账信息：', this.shopData[0]);
        }
    }

    /**
     * 初始化组件
     */
    ngOnInit(): void {
        console.log(this.title);
        this.initSelectList();
        // 初始化日期选择组件
        laydate.render({
            elem: '#gmtEffictive',
            type: 'datetime',
            theme: '#195456',
            done: (value, date) => {
                this.tcPtsUserShopProdConfig.gmtEffictive = value;
                console.log(value);
                console.log(date);
            }
        });
        // 初始化日期选择组件
        laydate.render({
            elem: '#gmtExpired',
            type: 'datetime',
            theme: '#195456',
            done: (value, date) => {
                this.tcPtsUserShopProdConfig.gmtExpired = value;
                console.log(value);
                console.log(date);
            }
        });

    }

    doAddTcPtsUserShopProdConfig() {
        this.tcPtsUserShopProdConfig.shopId = this.shopId;
        this.ftConfitService.addShopUserProdConfig(this.tcPtsUserShopProdConfig).subscribe(res => {
            this.eventBus.publish('system_prodtrans_usr_shop_prod', this.shopData);
        });
    }

    /**
     * 下拉菜单初始化
     */
    initSelectList() {

        this.ftConfitService.getDataDictionaryByKey('TcProdtransTypeEnums').subscribe(res => {
            this.prodtransTypeOption = this.commonService.filterResult(res.json());
        });
    }

    goReturn() {
        this.eventBus.publish('system_prodtrans_usr_shop_prod', this.shopData);
    }
}

export class TcPtsUserShopProdConfigModel {
    prodtransId;
    shopId;
    prodtransName;
    bizSource;
    prodtransType;
    overdrawn;
    ptsStatus = 'TC_DRAFT';
    gmtExpired;
    gmtEffictive;
    gmtCreated;
    gmtModified;
}
