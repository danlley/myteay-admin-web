import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {DatePipe} from '@angular/common';
import {CommonServie} from '../../../utils/common.servie';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../../asyncService/asyncService.service';

@Component({
    selector: 'app-camp-shop-single',
    templateUrl: './campSingleShop.component.html',
    styleUrls: ['./campSingleShop.component.css']
})

/**
 * 店铺内营销活动管理组件
 */
export class CampSingleShopComponent implements OnInit {
    title = '店内营销活动管理!';
    shopStatusList: any[];
    contactKey: string;
    templateConfigList: any[];

    // 店铺信息，用于构建页面店铺信息展示
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
    constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe,
                private commonService: CommonServie, private activeRoute: ActivatedRoute, private eventBus: EventService) {
    }

    /**
     * 初始化组件
     */
    ngOnInit(): void {
        console.log(this.title);


        // 初始化店铺信息
        this.shopData = this.commonService.initShopData(this.activeRoute.snapshot.queryParams['data']);

        this.initShopStatusList();
        this.initShopList();
    }

    /**
     * 构建店铺信息列表，用于进入店铺进行相应的商品管理
     */
    initShopList() {
        this.tableElement = {
            'tableHeaders': [],
            'tableOp': [['停止', 'camp_shop_single_shutdown'],
                ['废弃', 'camp_shop_single_shutdown'],
                ['启动', 'camp_shop_single_start'],
                ['查看', 'camp_shop_single_view'],
                ['管理', 'camp_shop_single_mng']],
            'tableContent': []
        };
        this.ftConfitService.getAllShopConfig().subscribe(res => {
            this.templateConfigList = this.commonService.filterResult(res.json());
            this.tableElement.tableHeaders = ['活动ID', '活动名称', '活动开始时间', '活动结束时间', '店铺名称', '创建时间', '修改时间'];
            this.templateConfigList.forEach(e => {
                const gmtCreated = this.datePipe.transform(e.gmtCreated, 'yyyy-MM-dd HH:mm:ss');
                const gmtExpired = this.datePipe.transform(e.gmtExpired, 'yyyy-MM-dd HH:mm:ss');
                const shopStatus = this.getShopSwitchShow(e.shopStatus);
                this.tableElement.tableContent.push([e.shopId, e.shopName, e.ownerName, shopStatus,
                    e.shopAddress, gmtExpired, gmtCreated]);
            });
        });
    }

    /**
     * 转换店铺状态码为对应的店铺状态值
     *
     * @param {string} shopStatus
     * @returns {string}
     */
    private getShopSwitchShow(shopStatus: string): string {
        if (this.shopStatusList === null) {
            return '';
        }

        let shopStatusActural = '';
        this.shopStatusList.forEach(e => {
            if (e.bizKey === shopStatus) {
                shopStatusActural = e.value;
            }
        });

        return shopStatusActural;
    }

    initShopStatusList() {
        this.ftConfitService.getDataDictionaryByKey('PxShopStatusEnum').subscribe(res => {
            this.shopStatusList = this.commonService.filterResult(res.json());
        });
    }

    /**
     * 返回商品摘要列表页面
     */
    goReturn() {
        this.eventBus.publish('campaign_shop', this.shopData);
    }
}
