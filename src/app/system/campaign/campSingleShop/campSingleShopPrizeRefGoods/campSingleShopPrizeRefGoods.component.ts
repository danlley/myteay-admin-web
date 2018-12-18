import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {DatePipe} from '@angular/common';
import {CommonServie} from '../../../../utils/common.servie';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../../../asyncService/asyncService.service';
import {PxGoodsConfigModel} from '../../../../model/goods';

@Component({
    selector: 'app-camp-shop-single-prize-ref',
    templateUrl: './campSingleShopPrizeRefGoods.component.html',
    styleUrls: ['./campSingleShopPrizeRefGoods.component.css']
})

/**
 * 店铺内营销活动奖品管理组件
 */
export class CampSingleShopPrizeRefGoodsComponent implements OnInit {
    title = '店内营销活动奖品管理!';
    templateConfigList: any[];
    goodsTypeOption;

    goodsType;
    shopId;
    goodsName = '';
    goodsList;
    goodsListLeftSide: PxGoodsConfigModel[] = [];
    goodsListRightSide: PxGoodsConfigModel[] = [];


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

        this.shopId = this.shopData[0];

        this.doQuerySingleShopCampPrize(this.shopData[14]);
        this.initSelectList();
        this.initGoodsPackagesList();
    }

    gotoRightSide(goods) {
        this.goodsListRightSide.push(goods);
        this.goodsListLeftSide = [];
        this.goodsList.forEach(e => {
            let addFlag = true;
            this.goodsListRightSide.forEach(e1 => {
                if (e.goodsId === e1.goodsId) {
                    addFlag = false;
                }
            });
            if (addFlag) {
                this.goodsListLeftSide.push(e);
            }
        });
    }

    gotoLeftSide(goods) {
        this.goodsListLeftSide.push(goods);
        this.goodsListRightSide = [];
        this.goodsList.forEach(e => {
            let addFlag = true;
            this.goodsListLeftSide.forEach(e1 => {
                if (e.goodsId === e1.goodsId) {
                    addFlag = false;
                }
            });
            if (addFlag) {
                this.goodsListRightSide.push(e);
            }
        });
    }

    /**
     * 初始化商品概要列表表格展示数据
     */
    initGoodsPackagesList() {
        this.ftConfitService.getAllGoodsByShopId(this.shopId).subscribe(res => {
            this.goodsList = this.commonService.filterResult(res.json());
            this.goodsListLeftSide = this.goodsList;
            console.log('this.goodsList---------->', this.goodsList);
        });
    }

    /**
     * 查询当前店铺上架商品列表
     */
    doQueryOnlineGoodsList() {
        console.log('goodsType--------------->', this.goodsType);
        console.log('shopId--------------->', this.shopId);
        console.log('goodsName--------------->', this.goodsName);
    }

    /**
     * 下拉菜单初始化
     */
    initSelectList() {

        this.ftConfitService.getDataDictionaryByKey('PxGoodsTypeEnum').subscribe(res => {
            this.goodsTypeOption = this.commonService.filterResult(res.json());
        });
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
    gmtCreated: string;
    gmtModified: string;
    operationType = 'PX_ADD';
}
