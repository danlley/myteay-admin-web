import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {DatePipe} from '@angular/common';
import {CommonServie} from '../../../../utils/common.servie';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../../../asyncService/asyncService.service';
import {CampPrizeStatusEnum} from '../../../../commons/enums/CampPrizeStatusEnum';
import {CampPrizeLimitEnum} from '../../../../commons/enums/CampPrizeLimitEnum';
import {CampPrizeTypeEnum} from '../../../../commons/enums/CampPrizeTypeEnum';

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
  templateConfigList: any[];

  // 店铺信息，用于构建页面店铺信息展示
  shopData: string[][] = [];
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
  constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe, private campPrizeStatusEnum: CampPrizeStatusEnum,
              private campPrizeLimitEnum: CampPrizeLimitEnum, private campPrizeTypeEnum: CampPrizeTypeEnum,
              private commonService: CommonServie, private activeRoute: ActivatedRoute, private eventBus: EventService) {
  }

  /**
   * 初始化组件
   */
  ngOnInit(): void {
    // 初始化店铺信息
    //this.shopData = this.commonService.initShopData(this.activeRoute.snapshot.queryParams['data']);

    const campPrizeData = this.activeRoute.snapshot.queryParams['data'][1];
    console.log('this.shopData[14]', campPrizeData);
    this.doQuerySingleShopCampPrize(campPrizeData);

  }


  /**
   * 查询单个奖品详情
   */
  doQuerySingleShopCampPrize(prizeId) {
    this.campPrizeModel.operationType = 'PX_QUERY_ONE';
    this.campPrizeModel.prizeId = prizeId;
    console.log('this.campPrizeModel------------------------->', this.campPrizeModel);
    this.ftConfitService.manageCampPrizeConfig(this.campPrizeModel).subscribe(res => {
      this.viewData = this.commonService.filterResult(res);
      this.campPrizeStatusEnum.values.forEach(e => {
        if (e[0] === this.viewData.prizeStatus) {
          this.viewData.prizeStatusFace = e[1];
        }
      });

      this.campPrizeLimitEnum.values.forEach(e=>{
        if (e[0] === this.viewData.prizeLimit) {
          this.viewData.prizeLimitFace = e[1];
        }
      });

      this.campPrizeTypeEnum.values.forEach(e=>{
        if (e[0] === this.viewData.prizeType) {
          this.viewData.prizeTypeFace = e[1];
        }
      });
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

  // ------------------------------      页面展示属性     ----------------------------------
  prizeStatusFace = 'CAMP_PRIZE_DRAFT';
  prizeLimitFace = '';
  prizeTypeFace = '';
}
