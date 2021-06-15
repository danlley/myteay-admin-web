import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {DatePipe} from '@angular/common';
import {CommonServie} from '../../../../utils/common.servie';
import {EventService} from '../../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {PxGoodsConfigModel} from '../../../../model/goods';
import {TcDiscountGoodsConfigModel} from './disGoodsConfigItem/disGoodsConfigItem.component';
import {environment} from '../../../../../environments/environment.prod';
import {PxGoodsTypeEnum} from '../../../../commons/enums/PxGoodsTypeEnum';
import {TcDiscountGoodsTypeEnum} from '../../../../commons/enums/TcDiscountGoodsTypeEnum';
import {TcDiscountCrowdTypeEnum} from '../../../../commons/enums/TcDiscountCrowdTypeEnum';

declare const laydate;

@Component({
  selector: 'app-system-discount-main-add',
  templateUrl: './addDisGoodsConf.component.html',
  styleUrls: ['./addDisGoodsConf.component.css']
})

/**
 * 原材料新增组件
 */
export class AddDisGoodsConfComponent implements OnInit {
  title = '原材料新增!';
  shopId;
  shopData;
  errMsg;
  isNeedShowErrMsg;

  goodsListLeftSide: PxGoodsConfigModel[] = [];
  goodsType = 'PX_GOODS_DP';
  goodsName = '';
  goodsList;
  goods;
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
              public pxGoodsTypeEnum: PxGoodsTypeEnum, public tcDiscountGoodsTypeEnum: TcDiscountGoodsTypeEnum, public tcDiscountCrowdTypeEnum: TcDiscountCrowdTypeEnum,
              public activeRoute: ActivatedRoute, private eventBus: EventService) {

    const data = this.activeRoute.snapshot.queryParams['data'];

      this.shopData = data;
      this.shopId = this.shopData[0].split(',')[0];
      console.log('新增折扣优惠信息：', this.shopData[0]);
  }

  /**
   * 初始化组件
   */
  ngOnInit(): void {
    console.log(this.title);
    this.doQueryOnlineGoodsList();
    // 初始化日期选择组件
    laydate.render({
      elem: '#gmtEffictive',
      type: 'datetime',
      theme: '#195456',
      done: (value, date) => {
        this.discountGoodsConf.gmtEffictive = value;
        console.log(value);
        console.log(date);
      }
    });
    // 初始化日期选择组件
    laydate.render({
      elem: '#gmtExpired',
      type: 'datetime',
      theme: '#195456',
      done: (value, date) => {
        this.discountGoodsConf.gmtExpired = value;
        console.log(value);
        console.log(date);
      }
    });

  }

  doAddDiscountGoodsConf() {
    this.discountGoodsConf.goodsId = this.goods.goodsId;
    this.discountGoodsConf.goodsImage = this.goods.goodsImage;
    this.discountGoodsConf.shopId = this.goods.shopId;

    this.ftConfitService.addDiscountGoodsConfig(this.discountGoodsConf).subscribe(res => {
      this.eventBus.publish('system_discount_main', this.shopData);
    });

    console.log('----------------->', this.discountGoodsConf);
  }

  gotoRightSide(goods) {
    this.goods = goods;
  }

  /**
   * 查询当前店铺上架商品列表
   */
  doQueryOnlineGoodsList() {
    this.initGoodsPackagesList();
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
      this.goodsList = this.commonService.filterResult(res);
      console.log('左侧数据 this.goodsList---------------->', this.goodsList);
      this.goodsListLeftSide = [];
      this.goodsList.forEach(e => {
        this.goodsListLeftSide.push(e);
      });
    });
  }

  goReturn() {
    this.eventBus.publish('system_discount_main', this.shopData);
  }
}
