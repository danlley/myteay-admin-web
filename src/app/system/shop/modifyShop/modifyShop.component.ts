import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {CommonServie} from '../../../utils/common.servie';
import {PxShopConfigModel} from '../../../model/shop';
import {PxShopStatusEnum} from '../../../commons/enums/PxShopStatusEnum';

declare let laydate;

@Component({
  selector: 'app-modify-shop',
  templateUrl: './modifyShop.component.html',
  styleUrls: ['./modifyShop.component.css']
})

/**
 * 修改店铺组件
 */
export class ModifyShopComponent implements OnInit {
  title = '修改店铺!';
  shopId: number;
  formData = new PxShopConfigModel();
  data;

  /**
   * 构建组件
   *
   * @param {FatigeConfigService} ftConfitService
   * @param {DatePipe} datePipe
   * @param {CommonServie} commonService
   * @param {ActivatedRoute} activeRoute
   * @param {EventService} eventBus
   */
  constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe, public pxShopStatusEnum: PxShopStatusEnum,
              private commonService: CommonServie, public activeRoute: ActivatedRoute, private eventBus: EventService) {
  }

  /**
   * 初始化当前组件
   */
  ngOnInit(): void {
    this.shopId = this.activeRoute.snapshot.queryParams['id'];
    console.log('shopId==================>', this.shopId);

    this.queryShopConfig();

    laydate.render({
      elem: '#test1', // s为页面日期选择输入框的id
      type: 'datetime',
      theme: '#22787a',
      done: (value, date) => {
        this.formData.gmtExpired = value;
        console.log(value);
        console.log(date);
      }
    });
  }

  /**
   * 修改店铺信息
   */
  modifyShopConfig() {

    this.formData.gmtCreated = this.datePipe.transform(this.formData.gmtCreated, 'yyyy-MM-dd HH:mm:ss');
    this.formData.gmtModified = this.datePipe.transform(this.formData.gmtModified, 'yyyy-MM-dd HH:mm:ss');
    this.formData.gmtExpired = this.datePipe.transform(this.formData.gmtExpired, 'yyyy-MM-dd HH:mm:ss');

    console.log('----------------------------------->', this.formData);
    this.ftConfitService.manageShopConfig(this.formData).subscribe(res => {
      this.data = this.commonService.filterResult(res);
      this.eventBus.publish('system_shop_manage', this.title);
    });
  }

  /**
   * 查询当前店铺信息，用于填充店铺修改表单
   */
  queryShopConfig() {
    console.log('----------------------------------->', this.formData);
    const queryData = new PxShopConfigModel();
    queryData.shopId = this.shopId;
    queryData.operationType = 'PX_QUERY_ONE';
    console.log('=======================>', queryData);
    this.ftConfitService.manageShopConfig(queryData).subscribe(res => {
      this.data = this.commonService.filterResult(res);
      this.formData.shopId = this.data.shopId;
      this.formData.gmtCreated = this.data.gmtCreated;
      this.formData.gmtExpired = this.datePipe.transform(this.data.gmtExpired, 'yyyy-MM-dd HH:mm:ss');
      this.formData.gmtModified = this.data.gmtModified;
      this.formData.operationType = 'PX_MODIFY';
      this.formData.ownerIdcard = this.data.ownerIdcard;
      this.formData.ownerName = this.data.ownerName;
      this.formData.ownerPhone = this.data.ownerPhone;
      this.formData.shopName = this.data.shopName;
      this.formData.shopStatus = this.data.shopStatus;
      this.formData.shopTel = this.data.shopTel;
      this.formData.waiterName = this.data.waiterName;
      this.formData.shopAddress = this.data.shopAddress;
      console.log('=======================>', this.formData);
    });
  }

}
