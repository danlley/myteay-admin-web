import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {DatePipe} from '@angular/common';
import {CommonServie} from '../../../../utils/common.servie';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../../../asyncService/asyncService.service';

@Component({
    selector: 'app-camp-shop-single-prize-view-detail',
    templateUrl: './campSingleShopPrizeViewDetail.component.html',
    styleUrls: ['./campSingleShopPrizeViewDetail.component.css']
})

/**
 * 店铺内营销活动奖品管理组件
 */
export class CampSingleShopPrizeViewDetailComponent implements OnInit {
    title = '店内营销活动奖品管理!';
    campStatusList: any[];
    templateConfigList: any[];

    // 店铺信息，用于构建页面店铺信息展示
    shopData;
    campPrizeModel: CampPrizeModel = new CampPrizeModel();
    viewData: CampPrizeModel = new CampPrizeModel();

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

        this.initCampPrizeStatusList();
        this.doQuerySingleShopCampPrize( this.shopData[14]);

    }


    /**
     * 查询单个奖品详情
     */
    doQuerySingleShopCampPrize(prizeId) {
        this.campPrizeModel.operationType = 'PX_QUERY_ONE';
        this.campPrizeModel.prizeId = prizeId;
        console.log('this.campPrizeModel------------------------->', this.campPrizeModel);
        this.ftConfitService.manageCampPrizeConfig(this.campPrizeModel).subscribe(res => {
            this.viewData = this.commonService.filterResult(res.json());
            console.log('=======================>', this.viewData);
        });
    }

    initCampPrizeStatusList() {
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
    prizeType = 'CAMP_COMMON_PRIZE';
    prizeLimit = 'CAMP_ALL_LIMIT';
    orderTotalAmount = '0.00';
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
    gmtCreated: string;
    gmtModified: string;
    operationType = 'PX_ADD';
}
