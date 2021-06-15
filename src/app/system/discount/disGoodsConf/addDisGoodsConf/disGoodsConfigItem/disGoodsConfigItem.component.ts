import {Component, Input, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {DatePipe} from '@angular/common';
import {CommonServie} from '../../../../../utils/common.servie';
import {EventService} from '../../../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../../../environments/environment.prod';
import {TcDiscountGoodsTypeEnum} from '../../../../../commons/enums/TcDiscountGoodsTypeEnum';
import {TcDiscountCrowdTypeEnum} from '../../../../../commons/enums/TcDiscountCrowdTypeEnum';

declare const laydate;

@Component({
  selector: 'app-system-discount-main-add-item',
  templateUrl: './disGoodsConfigItem.component.html',
  styleUrls: ['./disGoodsConfigItem.component.css']
})

/**
 * 原材料新增组件
 */
export class DisGoodsConfigItemComponent implements OnInit {
  title = '原材料新增!';
  shopId;
  @Input() shopData;
  errMsg;
  isNeedShowErrMsg;

  /** 表格 */
  @Input() goods;

  imgPath = environment.PKG_IMG_SHOW_URL;
  discountGoodsConf: TcDiscountGoodsConfigModel = new TcDiscountGoodsConfigModel();

  /**
   * 构建组件
   *
   * @param {FatigeConfigService} ftConfitService
   * @param {DatePipe} datePipe
   * @param {CommonServie} commonService
   */
  constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe, private commonService: CommonServie,
              public tcDiscountGoodsTypeEnum: TcDiscountGoodsTypeEnum, public tcDiscountCrowdTypeEnum: TcDiscountCrowdTypeEnum,
              public activeRoute: ActivatedRoute, private eventBus: EventService) {
  }

  /**
   * 初始化组件
   */
  ngOnInit(): void {
    console.log(this.title);
  }

  doAddDiscountGoodsConf() {
    this.discountGoodsConf.goodsId = this.goods.goodsId;
    this.discountGoodsConf.goodsImage = this.goods.goodsImage;
    this.discountGoodsConf.shopId = this.goods.shopId;
    // this.discountGoodsConf.discountName = this.goods.goodsTitle;
    this.ftConfitService.addDiscountGoodsConfig(this.discountGoodsConf).subscribe(res => {
      this.eventBus.publish('system_discount_main', this.shopData);
    });
    console.log('----------------->', this.discountGoodsConf);
  }
}

export class TcDiscountGoodsConfigModel {
  goodsId;
  discountId;
  goodsImage;
  discountName;
  discountType;
  discountPrice;
  discountValue;
  prodtransId;
  distribution = '{DH:[0-11]},{HH:[15,17]}';
  shopId;
  crowdType;
  discountStatus = 'TC_DRAFT';
  comments;
  gmtEffictive;
  gmtExpired;
  gmtCreated;
  gmtModified;
}

