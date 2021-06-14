import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {PxGoodsConfigModel} from '../../../model/goods';
import {CommonServie} from '../../../utils/common.servie';
import {PxGoodsTypeEnum} from '../../../commons/enums/PxGoodsTypeEnum';
import {PxGoodsTuanEnum} from '../../../commons/enums/PxGoodsTuanEnum';
import {PxGoodsQuanEnum} from '../../../commons/enums/PxGoodsQuanEnum';
import {PxGoodsHuiyuanEnum} from '../../../commons/enums/PxGoodsHuiyuanEnum';
import {PxGoodsOrderTypeEnum} from '../../../commons/enums/PxGoodsOrderTypeEnum';

declare let laydate;

@Component({
  selector: 'app-add-goods',
  templateUrl: './addGoods.component.html',
  styleUrls: ['./addGoods.component.css']
})

/**
 * 添加商品摘要信息
 */
export class AddGoodsComponent implements OnInit {
  title = '添加商品摘要信息';

  /** 商品摘要数据管理模型 */
  goodsConfigModel = new PxGoodsConfigModel();

  // 店铺信息，用于构建页面店铺信息展示
  shopData;

  // 文件处理所需变量，用于上传商品摘要所需的图片文件
  fileList;
  currentFile: File;
  fileName;
  errorMessage;

  /**
   * 组件构造
   *
   * @param {FatigeConfigService} ftConfitService
   * @param {EventService} eventBus
   * @param {PxGoodsTypeEnum} pxGoodsTypeEnum
   * @param {PxGoodsTuanEnum} pxGoodsTuanEnum
   * @param {PxGoodsQuanEnum} pxGoodsQuanEnum
   * @param {PxGoodsHuiyuanEnum} pxGoodsHuiyuanEnum
   * @param {PxGoodsOrderTypeEnum} pxGoodsOrderTypeEnum
   * @param {CommonServie} commonService
   * @param {ActivatedRoute} activeRoute
   */
  constructor(private ftConfitService: FatigeConfigService, private eventBus: EventService,
              public pxGoodsTypeEnum: PxGoodsTypeEnum, public pxGoodsTuanEnum: PxGoodsTuanEnum,
              public pxGoodsQuanEnum: PxGoodsQuanEnum, public pxGoodsHuiyuanEnum: PxGoodsHuiyuanEnum, public pxGoodsOrderTypeEnum: PxGoodsOrderTypeEnum,
              private commonService: CommonServie, private activeRoute: ActivatedRoute) {
  }

  /**
   * 初始化页面所需数据
   */
  ngOnInit(): void {
    // 打印当前页面title
    console.log(this.title);
    this.goodsConfigModel.goodsOnlineTime = '周一至周日 早8点至晚10点';
    this.goodsConfigModel.goodsDesc = '单品';
    this.goodsConfigModel.orderType = 'PX_NON_APPOINTMENT';
    this.goodsConfigModel.isTuan = 'PX_HAS_TUAN';
    this.goodsConfigModel.isQuan = 'PX_HAS_QUAN';
    this.goodsConfigModel.isHuiyuan = 'PX_UNSUPPORT_HUIYUAN';

    // 初始化店铺信息
    this.shopData = this.activeRoute.snapshot.queryParams['data'];

    // 初始化日期选择组件
    laydate.render({
      elem: '#test1', // s为页面日期选择输入框的id
      type: 'datetime',
      theme: '#22787a',
      done: (value, date) => {
        this.goodsConfigModel.gmtExpired = value;
        console.log(value);
        console.log(date);
      }
    });
  }

  /**
   * 选择上传文件后的数据处理
   *
   * @param $event
   */
  uploadFile($event) {
    this.errorMessage = '';
    this.fileList = $event.target.files;
    this.currentFile = this.fileList[0];
    this.fileName = this.currentFile.name;
  }

  /**
   * 添加新的商品摘要信息
   */
  addNewGoodsConfig() {
    const formData: FormData = new FormData();
    formData.append('file', this.currentFile, this.currentFile.name);
    this.goodsConfigModel.shopId = this.shopData[0];
    console.log('----------------------------------->', this.goodsConfigModel);
    formData.append('shopId', '' + this.goodsConfigModel.shopId);
    formData.append('goodsTitle', this.goodsConfigModel.goodsTitle);
    formData.append('goodsDesc', this.goodsConfigModel.goodsDesc);
    formData.append('goodsPrice', this.goodsConfigModel.goodsPrice);
    formData.append('goodsCommPrice', this.goodsConfigModel.goodsCommPrice);
    formData.append('goodsOnlineTime', this.goodsConfigModel.goodsOnlineTime);
    formData.append('orderType', this.goodsConfigModel.orderType);
    formData.append('goodsType', this.goodsConfigModel.goodsType);
    formData.append('isHuiyuan', this.goodsConfigModel.isHuiyuan);
    formData.append('isQuan', this.goodsConfigModel.isQuan);
    formData.append('isTuan', this.goodsConfigModel.isTuan);
    formData.append('operationType', 'PX_ADD');
    formData.append('gmtExpired', this.goodsConfigModel.gmtExpired);
    this.ftConfitService.manageGoodsConfig(formData).subscribe(res => {
      console.log('=======================>', res);
      this.eventBus.publish('system_goods_manage_all', this.shopData);
    });
  }

  /**
   * 返回商品摘要列表页面
   */
  goReturn() {
    this.eventBus.publish('system_goods_manage_all', this.shopData);
  }
}
