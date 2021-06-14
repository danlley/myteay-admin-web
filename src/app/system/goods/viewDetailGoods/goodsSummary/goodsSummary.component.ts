import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {environment} from '../../../../../environments/environment.prod';
import {PxGoodsConfigModel} from '../../../../model/goods';
import {CommonServie} from '../../../../utils/common.servie';
import {PxGoodsOrderTypeEnum} from '../../../../commons/enums/PxGoodsOrderTypeEnum';
import {PxGoodsTypeEnum} from '../../../../commons/enums/PxGoodsTypeEnum';
import {PxGoodsHuiyuanEnum} from '../../../../commons/enums/PxGoodsHuiyuanEnum';
import {PxGoodsQuanEnum} from '../../../../commons/enums/PxGoodsQuanEnum';
import {PxGoodsTuanEnum} from '../../../../commons/enums/PxGoodsTuanEnum';
import {PxGoodsStatusEnum} from '../../../../commons/enums/PxGoodsStatusEnum';

@Component({
  selector: 'app-view-detail-goods-summary',
  templateUrl: './goodsSummary.component.html',
  styleUrls: ['./goodsSummary.component.css']
})

/**
 * 商品摘要展示组件
 */
export class GoodsSummaryComponent implements OnInit {
  title = '商品摘要详情!';

  @Input() formData = new PxGoodsConfigModel();

  data;
  goodsConfigModel = new PxGoodsConfigModel();
  image;

  /**
   * 构建组件
   *
   * @param {FatigeConfigService} ftConfitService
   * @param {CommonServie} commonService
   * @param {DatePipe} datePipe
   */
  constructor(private ftConfitService: FatigeConfigService, private commonService: CommonServie, private datePipe: DatePipe,
              private pxGoodsOrderTypeEnum: PxGoodsOrderTypeEnum, private pxGoodsTypeEnum: PxGoodsTypeEnum, private pxGoodsHuiyuanEnum: PxGoodsHuiyuanEnum,
              private pxGoodsQuanEnum: PxGoodsQuanEnum, private pxGoodsTuanEnum: PxGoodsTuanEnum, private pxGoodsStatusEnum: PxGoodsStatusEnum) {
  }

  /**
   * 初始化组件
   */
  ngOnInit(): void {
    console.log(this.title);
    this.initSingleGoods();

    // 商品摘要图片预览地址
    this.image = environment.PKG_IMG_SHOW_URL + this.formData.goodsImage;
  }

  /**
   * 查询当前商品摘要信息
   */
  private initSingleGoods() {
    const formData: FormData = new FormData();
    formData.append('goodsId', '' + this.formData.goodsId);
    formData.append('operationType', 'PX_QUERY_ONE');
    console.log('--formData--------------------------------->', this.formData.goodsId);

    this.ftConfitService.manageGoodsConfig(formData).subscribe(res => {
      this.data = this.commonService.filterResult(res);
      console.log('====data===================>', this.data);
      this.goodsConfigModel.isHuiyuan = this.data.isHuiyuan;
      this.goodsConfigModel.isQuan = this.data.isQuan;
      this.goodsConfigModel.isTuan = this.data.isTuan;
      this.goodsConfigModel.orderType = this.data.orderType;
      this.goodsConfigModel.goodsType = this.data.goodsType;

          this.pxGoodsOrderTypeEnum.values.forEach(e => {
            if (e[0] === this.goodsConfigModel.orderType) {
              this.goodsConfigModel.orderTypeShow = e[1];
            }
          });
          this.pxGoodsTypeEnum.values.forEach(e => {
            if (e[0] === this.goodsConfigModel.goodsType) {
              this.goodsConfigModel.goodsTypeShow = e[1];
            }
          });
          this.pxGoodsHuiyuanEnum.values.forEach(e => {
            if (e[0] === this.goodsConfigModel.isHuiyuan) {
              this.goodsConfigModel.isHuiyuanShow = e[1];
            }
          });
          this.pxGoodsQuanEnum.values.forEach(e => {
            if (e[0] === this.goodsConfigModel.isQuan) {
              this.goodsConfigModel.isQuanShow = e[1];
            }
          });
          this.pxGoodsTuanEnum.values.forEach(e => {
            if (e[0] === this.goodsConfigModel.isTuan) {
              this.goodsConfigModel.isTuanShow = e[1];
            }
          });
      this.goodsConfigModel.goodsStatus = this.data.goodsStatus;
          this.pxGoodsStatusEnum.values.forEach(e => {
            if (e[0] === this.goodsConfigModel.goodsStatus) {
              this.goodsConfigModel.goodsStatusShow = e[1];
            }
          });
      this.goodsConfigModel.goodsId = this.data.goodsId;
      this.goodsConfigModel.goodsImage = this.data.goodsImage;
      this.goodsConfigModel.goodsImageShow = environment.PKG_IMG_SHOW_URL + this.data.goodsImage;
      this.goodsConfigModel.gmtExpired = this.datePipe.transform(this.data.gmtExpired, 'yyyy-MM-dd HH:mm:ss');
      this.goodsConfigModel.goodsOnlineTime = this.data.goodsOnlineTime;
      this.goodsConfigModel.goodsCommPrice = this.data.goodsCommPrice;
      this.goodsConfigModel.goodsPrice = this.data.goodsPrice;
      this.goodsConfigModel.goodsDesc = this.data.goodsDesc;
      this.goodsConfigModel.goodsTitle = this.data.goodsTitle;
      this.goodsConfigModel.gmtCreated = this.datePipe.transform(this.data.gmtCreated, 'yyyy-MM-dd HH:mm:ss');
      this.goodsConfigModel.gmtModified = this.datePipe.transform(this.data.gmtModified, 'yyyy-MM-dd HH:mm:ss');
      this.goodsConfigModel.goodsSellAmount = this.data.goodsSellAmount;
      this.goodsConfigModel.shopId = this.data.shopId;
      console.log('==goodsConfigModel---------------==>', this.goodsConfigModel);
    });
  }
}
