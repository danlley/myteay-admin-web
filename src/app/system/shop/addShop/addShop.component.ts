import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../asyncService/asyncService.service';

declare let laydate;

@Component({
    selector: 'app-add-shop',
    templateUrl: './addShop.component.html',
    styleUrls: ['./addShop.component.css']
})
export class AddShopComponent implements OnInit {
    title = '添加店铺!';
    ftConfitService: FatigeConfigService;
    formData = new PxShopConfigModel();

    shopStatusList;

    constructor(ftConfitService: FatigeConfigService, private eventBus: EventService) {
        this.ftConfitService = ftConfitService;
    }

    ngOnInit(): void {
        console.log(this.title);
        this.initContactList();

        laydate.render({
            elem: '#test1', // s为页面日期选择输入框的id
            type: 'datetime',
            theme: '#22787a',
            done: (value, date) => {
                this.formData.gmtExpired = value;
                console.log(value);
                console.log(date);
            }
        });
    }

    addNewShopConfig() {
        console.log('----------------------------------->', this.formData);
        this.ftConfitService.manageShopConfig(this.formData).subscribe(res => {
            console.log('=======================>', res.json());
            this.eventBus.publish('system_shop_manage', this.title);
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
    operationType = 'PX_ADD';
    gmtExpired: string;
    gmtCreated: string;
    gmtModified: string;
}
