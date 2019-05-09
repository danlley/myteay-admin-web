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

    goodsType = '';
    shopId;
    prizeId;
    goodsName = '';
    goodsList;
    goodsListLeftSide: PxGoodsConfigModel[] = [];
    goodsListRightSide: PxGoodsConfigModel[] = [];
    goodsListEndSide: PxGoodsConfigModel[] = [];
    goodsRefList: CampPrizeRefGoodsModel[] = [];


    // 店铺信息，用于构建页面店铺信息展示
    shopData;
    campPrizeModel: CampPrizeModel = new CampPrizeModel();
    viewData: CampPrizeModel = new CampPrizeModel();


    isNeedShowErrMsg = false;
    errMsg = '';

    initFlag = true;

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
        this.prizeId = this.shopData[14];

        this.doQuerySingleShopCampPrize(this.prizeId);
        this.initSelectList();
        this.initGoodsPackagesList();
        this.initPrizeRefGoodsEndSideList();
    }

    /**
     * 对待保存列表执行保存动作
     */
    doAddOnlineGoodsRefList() {
        this.goodsRefList = [];
        if (this.goodsListRightSide !== null && this.goodsListRightSide !== undefined) {
            this.goodsListRightSide.forEach(e => {
                const model: CampPrizeRefGoodsModel = new CampPrizeRefGoodsModel();
                model.goodsId = e.goodsId;
                model.prizeId = this.prizeId;
                this.goodsRefList.push(model);
            });
        }

        this.goodsListEndSide = [];
        this.ftConfitService.manageShopCampPrizeRefGoodsListConfig(this.prizeId, this.goodsRefList).subscribe(res => {
            const list = this.commonService.filterResult(res.json());
            this.errMsg = '';
            const data = res.json();
            if (data.operateResult !== 'CAMP_OPERATE_SUCCESS') {
                this.isNeedShowErrMsg = true;
                this.errMsg = '奖品关联商品出错---------> 错误码:' + data.errorCode + '　　　　　　错误详情:' + data.errorDetail;
                this.initPrizeRefGoodsEndSideList();
            }
            if (list !== null) {
                list.forEach(e => {
                    this.goodsListEndSide.push(e.pxGoodsModel);
                });
            }
        });
    }

    /**
     * 将商品从选择列表中移入待保存列表
     * @param goods
     */
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

    /**
     * 将商品从待保存列表移除
     * @param goods
     */
    gotoLeftSide(goods, initFlag: boolean) {
        this.goodsListLeftSide.push(goods);
        if (!initFlag) {
            const tempList = [];
            this.goodsListRightSide.forEach(e => {
                if (e.goodsId !== goods.goodsId) {
                    tempList.push(e);
                }
            });
            this.goodsListRightSide = tempList;
            return;
        }
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
     * 初始化已经完成奖品关联的商品展示数据
     */
    initPrizeRefGoodsEndSideList() {
        this.goodsListEndSide = [];
        this.ftConfitService.getShopCampPrizeRefGoodsListConfig(this.prizeId).subscribe(res => {
            const list = this.commonService.filterResult(res.json());
            if (list !== null) {
                list.forEach(e => {
                    this.goodsListEndSide.push(e.pxGoodsModel);
                    let addFlag = false;
                    this.goodsListRightSide.forEach(e1 => {
                        addFlag = (e1.goodsId === e.pxGoodsModel.goodsId);
                    });

                    if (!addFlag) {
                        this.goodsListRightSide.push(e.pxGoodsModel);
                        this.initFlag = false;
                    }
                });
            }
        });
    }

    /**
     * 初始化商品概要列表表格展示数据
     */
    initGoodsPackagesList() {
        const formData: FormData = new FormData();
        formData.append('shopId', this.shopId);
        formData.append('goodsTitle', this.goodsName);
        formData.append('goodsType', this.goodsType);
        this.ftConfitService.getSingleShopPrizeGoodsConfig(formData).subscribe(res => {
            this.goodsList = this.commonService.filterResult(res.json());
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
        });
    }

    /**
     * 查询当前店铺上架商品列表
     */
    doQueryOnlineGoodsList() {
        this.initGoodsPackagesList();
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
        const data = [];
        let i = 0;
        this.shopData.forEach(e => {
            if ( i < 14) {
                data.push(e);
                i++;
            }
        });
        this.eventBus.publish('campaign_shop_single_prize_mng', data);
    }
}

export class CampPrizeRefGoodsModel {
    prizeId: string;
    goodsId: number;
    gmtCreated: string;
    gmtModified: string;
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
