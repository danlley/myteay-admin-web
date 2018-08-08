import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../asyncService/asyncService.service';
import {CommonServie} from '../../../utils/common.servie';
import {PxShopConfigModel} from '../../../model/shop';

declare let laydate;

@Component({
    selector: 'app-add-shop',
    templateUrl: './addShop.component.html',
    styleUrls: ['./addShop.component.css']
})

/**
 * 添加店铺组件
 */
export class AddShopComponent implements OnInit {
    title = '添加店铺!';
    formData = new PxShopConfigModel();

    shopStatusList;

    /**
     * 构建组件
     *
     * @param {FatigeConfigService} ftConfitService
     * @param {CommonServie} commonService
     * @param {EventService} eventBus
     */
    constructor(private ftConfitService: FatigeConfigService, private commonService: CommonServie, private eventBus: EventService) {
    }

    /**
     * 初始化组件
     */
    ngOnInit(): void {
        console.log(this.title);
        this.initShopStatusList();

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

    /**
     * 添加新店铺
     */
    addNewShopConfig() {
        console.log('----------------------------------->', this.formData);
        this.formData.operationType = 'PX_ADD';
        this.ftConfitService.manageShopConfig(this.formData).subscribe(res => {
            console.log('=======================>', res.json());
            this.eventBus.publish('system_shop_manage', this.title);
        });
    }

    /**
     * 获取店铺状态列表，用于选择店铺状态
     */
    initShopStatusList() {
        this.ftConfitService.getDataDictionaryByKey('PxShopStatusEnum').subscribe(res => {
            this.shopStatusList = this.commonService.filterResult(res.json());
        });
    }
}


