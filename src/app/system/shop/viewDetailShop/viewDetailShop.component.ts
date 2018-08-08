import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {PxShopConfigModel} from '../../../model/shop';
import {CommonServie} from '../../../utils/common.servie';

@Component({
    selector: 'app-view-detail-shop',
    templateUrl: './viewDetailShop.component.html',
    styleUrls: ['./viewDetailShop.component.css']
})

/**
 * 店铺详情查看组件
 */
export class ViewDetailShopComponent implements OnInit {
    title = '店铺详情查看';
    shopId: number;
    ftConfitService: FatigeConfigService;
    formData = new PxShopConfigModel();
    data;

    shopStatusList;

    /**
     * 构建组件
     *
     * @param {FatigeConfigService} ftConfitService
     * @param {DatePipe} datePipe
     * @param {CommonServie} commonService
     * @param {ActivatedRoute} activeRoute
     * @param {EventService} eventBus
     */
    constructor(ftConfitService: FatigeConfigService, private datePipe: DatePipe, private commonService: CommonServie,
                public activeRoute: ActivatedRoute, private eventBus: EventService) {
        this.ftConfitService = ftConfitService;
    }

    /**
     * 初始化组件
     */
    ngOnInit(): void {
        this.shopId = this.activeRoute.snapshot.queryParams['id'];
        console.log('shopId==================>', this.shopId);

        this.initContactList();
        this.queryShopConfig();
    }

    /**
     * 返回店铺管理页面
     */
    gotoShopConfig() {
        this.eventBus.publish('system_shop_manage', this.title);
    }

    /**
     * 查询店铺信息
     */
    queryShopConfig() {
        console.log('----------------------------------->', this.formData);
        const queryData = new PxShopConfigModel();
        queryData.shopId = this.shopId;
        queryData.operationType = 'PX_QUERY_ONE';
        console.log('=======================>', queryData);
        this.ftConfitService.manageShopConfig(queryData).subscribe(res => {
            this.data = this.commonService.filterResult(res.json());
            this.formData.shopId = this.data.shopId;
            this.formData.gmtCreated = this.datePipe.transform(this.data.gmtCreated, 'yyyy-MM-dd HH:mm:ss');
            this.formData.gmtExpired = this.datePipe.transform(this.data.gmtExpired, 'yyyy-MM-dd HH:mm:ss');
            this.formData.gmtModified = this.datePipe.transform(this.data.gmtModified, 'yyyy-MM-dd HH:mm:ss');
            this.formData.operationType = 'PX_MODIFY';
            this.formData.ownerIdcard = this.data.ownerIdcard;
            this.formData.ownerName = this.data.ownerName;
            this.formData.ownerPhone = this.data.ownerPhone;
            this.formData.shopName = this.data.shopName;
            this.formData.shopStatus = this.data.shopStatus;
            this.formData.shopTel = this.data.shopTel;
            this.formData.waiterName = this.data.waiterName;
            this.formData.shopAddress = this.data.shopAddress;
            console.log('=======================>', this.formData);
        });
    }

    /**
     * 获取店铺状态列表
     */
    initContactList() {
        this.ftConfitService.getDataDictionaryByKey('PxShopStatusEnum').subscribe(res => {
            this.shopStatusList = this.commonService.filterResult(res.json());
        });
    }

}
