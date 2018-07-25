import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-modify-shop',
    templateUrl: './modifyShop.component.html',
    styleUrls: ['./modifyShop.component.css']
})
export class ModifyShopComponent implements OnInit {
    title = '修改店铺!';
    shopId: number;
    ftConfitService: FatigeConfigService;
    formData = new PxShopConfigModel();
    data;

    shopStatusList;

    constructor(ftConfitService: FatigeConfigService, private datePipe: DatePipe, public activeRoute: ActivatedRoute) {
        this.ftConfitService = ftConfitService;
    }

    ngOnInit(): void {
        this.shopId = this.activeRoute.snapshot.queryParams['id'];
        console.log('shopId==================>', this.shopId);

        this.initContactList();
        this.queryShopConfig();
    }

    modifyShopConfig() {
        this.ftConfitService.manageShopConfig(this.formData).subscribe(res => {
            this.data = this.filterResult(res.json());
        });
    }

    queryShopConfig() {
        console.log('----------------------------------->', this.formData);
        const queryData = new PxShopConfigModel();
        queryData.shopId = this.shopId;
        queryData.operationType = 'PX_QUERY_ONE';
        console.log('=======================>', queryData);
        this.ftConfitService.manageShopConfig(queryData).subscribe(res => {
            this.data = this.filterResult(res.json());
            this.formData.shopId = this.data.shopId;
            this.formData.gmtCreated = this.data.gmtCreated;
            this.formData.gmtExpired = this.datePipe.transform(this.data.gmtExpired, 'yyyy-MM-dd hh:mm:ss');;
            this.formData.gmtModified = this.data.gmtModified;
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

    initContactList() {
        this.ftConfitService.getDataDictionaryByKey('PxShopStatusEnum').subscribe(res => {
            this.shopStatusList = this.filterResult(res.json());
        });
    }

    filterResult(data): any {
        console.log('开始过滤处理结果：', data);

        if ('CAMP_OPERATE_SUCCESS' !== data.operateResult) {
            console.log('返回结果失败：', data);
            return null;
        }
        return data.result;
    }
}

export class PxShopConfigModel {
    shopId: number;
    shopName: string;
    shopAddress: string;
    shopTel: string;
    waiterName: string;
    ownerName: string;
    ownerPhone: string;
    ownerIdcard: string;
    shopStatus: string;
    operationType = 'PX_MODIFY';
    gmtExpired: string;
    gmtCreated: string;
    gmtModified: string;
}
