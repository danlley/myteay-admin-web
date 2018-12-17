import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {DatePipe} from '@angular/common';
import {CommonServie} from '../../../../utils/common.servie';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../../../asyncService/asyncService.service';

@Component({
    selector: 'app-camp-shop-single-prize-add',
    templateUrl: './campSingleShopPrizeAdd.component.html',
    styleUrls: ['./campSingleShopPrizeAdd.component.css']
})

/**
 * 店铺内营销活动奖品管理组件
 */
export class CampSingleShopPrizeAddComponent implements OnInit {
    title = '店内营销活动奖品管理!';
    campStatusList: any[];
    templateConfigList: any[];

    // 店铺信息，用于构建页面店铺信息展示
    shopData;
    campPrizeModel: CampPrizeModel = new CampPrizeModel();

    isNeedShowErrMsg = false;
    errMsg = '';

    campId = '';
    shopId = '';

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
        this.campId = this.shopData[7];
        this.shopId = this.shopData[0];

        this.initCampStatusList();
        this.initCampPrizeList();
    }

    /**
     * 构建店内营销活动列表，用于进入店铺进行相应的店内营销活动管理
     */
    initCampPrizeList() {
        this.tableElement = {
            'tableHeaders': [],
            'tableOp': [['下架', 'single_shop_camp_shutdown'],
                ['删除', 'single_shop_camp_delete'],
                ['上架', 'single_shop_camp_start'],
                ['查看', 'camp_shop_single_view'],
                ['关联商品', 'camp_shop_single_mng']],
            'tableContent': []
        };
        this.ftConfitService.getShopAllCampPrizeConfig(this.campId).subscribe(res => {
            this.templateConfigList = this.commonService.filterResult(res.json());
            this.tableElement.tableHeaders = ['奖品名称', '奖品等级', '奖品比率', '奖位分布', '奖品单位价值', '奖品状态', '奖品数量'];
            this.templateConfigList.forEach(e => {
                const campPrizeStatus = this.getCampSwitchShow(e.prizeStatus);
                this.tableElement.tableContent.push([e.prizeName, e.prizeLevel, e.prizePercent, e.distribution,
                    e.price, campPrizeStatus, e.prizeAmount]);
            });
        });
    }

    /**
     * 转换店内营销活动状态码为对应的店内营销活动状态值
     *
     * @param {string} campStatus
     * @returns {string}
     */
    private getCampSwitchShow(campStatus: string): string {
        if (this.campStatusList === null) {
            return '';
        }

        let campStatusActural = '';
        this.campStatusList.forEach(e => {
            if (e.bizKey === campStatus) {
                campStatusActural = e.value;
            }
        });

        return campStatusActural;
    }

    initCampStatusList() {
        this.ftConfitService.getDataDictionaryByKey('CampPrizeStatusEnum').subscribe(res => {
            this.campStatusList = this.commonService.filterResult(res.json());
        });
    }

    /**
     * 返回店铺列表页面
     */
    goReturn() {
        this.eventBus.publish('campaign_shop_single_prize_mng', this.shopData);
    }
}

export class CampPrizeModel {
    prizeId: string;
    prizeName: string;
    campId: string;
    shopId: string;
    prizeLevel: string;
    prizePercent: string;
    distribution: string;
    price: string;
    prizeAmount: string;
    prizeStatus = 'CAMP_PRIZE_DRAFT';
    prizeEffictive: string;
    prizeExpired: string;
    operationType = 'PX_ADD';
}
