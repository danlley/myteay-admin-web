import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {EventService} from '../../../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {FatigeConfigService} from '../../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {CommonServie} from '../../../../../utils/common.servie';
import {CampStatusEnum} from '../../../../../commons/enums/CampStatusEnum';

@Component({
  selector: 'app-camp-prize-summary-table',
  templateUrl: './campSingleShopPrizeSummary.component.html',
  styleUrls: ['./campSingleShopPrizeSummary.component.css']
})

/**
 *  通用无分页表格组件
 */
export class CampSingleShopPrizeSummaryComponent implements OnInit {

  /** 表格 */
  @Input() viewData: CampPrizeModel = new CampPrizeModel();

  campStatusShow = '';

  /**
   * 组件构造
   */
  constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe, private campStatusEnum: CampStatusEnum,
              private commonService: CommonServie, private activeRoute: ActivatedRoute, private eventBus: EventService) {
  }

  /**
   * 表格基本信息的初始化工作
   */
  ngOnInit(): void {
    this.initCampPrizeStatusList();
  }

  initCampPrizeStatusList() {
    this.campStatusEnum.values.forEach(e => {
      if (e[0] === this.viewData.prizeStatus) {
        this.campStatusShow = e[1];
      }
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
  gmtCreated: string;
  gmtModified: string;
  operationType = 'PX_ADD';
}
