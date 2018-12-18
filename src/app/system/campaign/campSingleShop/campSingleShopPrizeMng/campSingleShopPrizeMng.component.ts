import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {DatePipe} from '@angular/common';
import {CommonServie} from '../../../../utils/common.servie';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../../../asyncService/asyncService.service';

@Component({
    selector: 'app-camp-shop-single-prize-mng',
    templateUrl: './campSingleShopPrizeMng.component.html',
    styleUrls: ['./campSingleShopPrizeMng.component.css']
})

/**
 * 店铺内营销活动奖品管理组件
 */
export class CampSingleShopPrizeMngComponent implements OnInit {
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
        // 监听店内营销活动奖品删除请求
        this.eventBus.registerySubject('single_shop_camp_prize_delete').subscribe(e => {
            this.doDeleteSingleShopCampPrize(e[0]);
        });

        // 监听店内营销活动奖品上架请求
        this.eventBus.registerySubject('single_shop_camp_prize_online').subscribe(e => {
            this.doOnlineSingleShopCampPrize(e[0]);
        });

        // 监听店内营销活动奖品下架请求
        this.eventBus.registerySubject('single_shop_camp_prize_offline').subscribe(e => {
            this.doOfflineSingleShopCampPrize(e[0]);
        });

        // 监听店内营销活动奖品详情查看请求
        this.eventBus.registerySubject('campaign_shop_single_prize_view_detail_inner').subscribe(e => {
            const sendData = [this.shopData, e];
            console.log('表格操作目标（详情）：', sendData);
            this.eventBus.publish('campaign_shop_single_prize_view_detail', sendData);
        });

        // 监听店内营销活动奖品下架请求
        this.eventBus.registerySubject('campaign_shop_single_prize_ref_inner').subscribe(e => {
            const sendData = [this.shopData, e];
            console.log('表格操作目标（详情）：', sendData);
            this.eventBus.publish('campaign_shop_single_prize_ref', sendData);
        });
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
            'tableOp': [['下架', 'single_shop_camp_prize_offline'],
                ['删除', 'single_shop_camp_prize_delete'],
                ['上架', 'single_shop_camp_prize_online'],
                ['查看', 'campaign_shop_single_prize_view_detail_inner'],
                ['关联商品', 'campaign_shop_single_prize_ref_inner']],
            'tableContent': []
        };
        this.ftConfitService.getShopAllCampPrizeConfig(this.campId).subscribe(res => {
            this.templateConfigList = this.commonService.filterResult(res.json());
            this.tableElement.tableHeaders = ['奖品ID', '奖品名称', '奖品等级', '奖品比率', '奖品单位价值', '奖品状态', '奖品数量'];
            this.templateConfigList.forEach(e => {
                const campPrizeStatus = this.getCampSwitchShow(e.prizeStatus);
                this.tableElement.tableContent.push([ e.prizeId, e.prizeName, e.prizeLevel, e.prizePercent,
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
     * 刷新当前营销活动列表
     */
    doQuery() {
        this.initCampPrizeList();
    }

    /**
     * 返回店铺列表页面
     */
    goReturn() {
        this.eventBus.publish('campaign_shop_single', this.shopData);
    }

    /**
     * 进入奖品添加页面
     */
    gotoAddCampPrize() {
        this.eventBus.publish('campaign_shop_single_prize_add', this.shopData);
    }

    /**
     * 删除奖品
     */
    doDeleteSingleShopCampPrize(prizeId) {
        console.log('this.campPrizeModel------------------------->', this.campPrizeModel);
        this.campPrizeModel.operationType = 'PX_DELETE';
        this.campPrizeModel.prizeId = prizeId;
        this.ftConfitService.manageCampPrizeConfig(this.campPrizeModel).subscribe(res => {
            console.log('=======================>', res.json());
            this.doQuery();
        });
    }

    /**
     * 上架奖品
     */
    doOnlineSingleShopCampPrize(prizeId) {
        console.log('this.campPrizeModel------------------------->', this.campPrizeModel);
        this.campPrizeModel.operationType = 'PX_MODIFY';
        this.campPrizeModel.prizeId = prizeId;
        this.campPrizeModel.prizeStatus = 'CAMP_PRIZE_ONLINE';
        this.ftConfitService.manageCampPrizeConfig(this.campPrizeModel).subscribe(res => {
            console.log('=======================>', res.json());
            this.doQuery();
        });
    }

    /**
     * 下架奖品
     */
    doOfflineSingleShopCampPrize(prizeId) {
        console.log('this.campPrizeModel------------------------->', this.campPrizeModel);
        this.campPrizeModel.operationType = 'PX_MODIFY';
        this.campPrizeModel.prizeId = prizeId;
        this.campPrizeModel.prizeStatus = 'CAMP_PRIZE_OFFLINE';
        this.ftConfitService.manageCampPrizeConfig(this.campPrizeModel).subscribe(res => {
            console.log('=======================>', res.json());
            this.doQuery();
        });
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
