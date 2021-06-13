import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {PxShopConfigModel} from '../../../model/shop';
import {CommonServie} from '../../../utils/common.servie';
import {PxShopStatusEnum} from '../../../commons/enums/PxShopStatusEnum';

@Component({
  selector: 'app-view-detail-shop',
  templateUrl: './viewDetailShop.component.html',
  styleUrls: ['./viewDetailShop.component.css']
})

/**
 * 店铺详情查看组件
 */
export class ViewDetailShopComponent implements OnInit {
  title = '店铺详情查看';
  shopId: number;
  ftConfitService: FatigeConfigService;
  formData = new PxShopConfigModel();


  /**
   * 构建组件
   *
   * @param {FatigeConfigService} ftConfitService
   * @param {DatePipe} datePipe
   * @param {CommonServie} commonService
   * @param {ActivatedRoute} activeRoute
   * @param {EventService} eventBus
   */
  constructor(ftConfitService: FatigeConfigService, private datePipe: DatePipe, private commonService: CommonServie,
              public pxShopStatusEnum: PxShopStatusEnum,
              public activeRoute: ActivatedRoute, private eventBus: EventService) {
    this.ftConfitService = ftConfitService;
  }

  /**
   * 初始化组件
   */
  ngOnInit(): void {
    this.shopId = this.activeRoute.snapshot.queryParams['id'];
    console.log('shopId==================>', this.shopId);

    this.queryShopConfig();
  }

  /**
   * 返回店铺管理页面
   */
  gotoShopConfig() {
    this.eventBus.publish('system_shop_manage', this.title);
  }

  /**
   * 查询店铺信息
   */
  queryShopConfig() {
    console.log('----------------------------------->', this.formData);
    const queryData = new PxShopConfigModel();
    queryData.shopId = this.shopId;
    queryData.operationType = 'PX_QUERY_ONE';
    console.log('=======================>', queryData);
    this.ftConfitService.manageShopConfig(queryData).subscribe(res => {
      let data = this.commonService.filterResult(res);
      this.formData.shopId = data.shopId;
      this.formData.gmtCreated = this.datePipe.transform(data.gmtCreated, 'yyyy-MM-dd HH:mm:ss');
      this.formData.gmtExpired = this.datePipe.transform(data.gmtExpired, 'yyyy-MM-dd HH:mm:ss');
      this.formData.gmtModified = this.datePipe.transform(data.gmtModified, 'yyyy-MM-dd HH:mm:ss');
      this.formData.operationType = 'PX_MODIFY';
      this.formData.ownerIdcard = data.ownerIdcard;
      this.formData.ownerName = data.ownerName;
      this.formData.ownerPhone = data.ownerPhone;
      this.formData.shopName = data.shopName;
      this.formData.shopStatus = data.shopStatus;
      this.formData.shopTel = data.shopTel;
      this.formData.waiterName = data.waiterName;
      this.formData.shopAddress = data.shopAddress;
      this.formData.shopStatusFace = this.findShopStatusFace(data.shopStatus);
      console.log('=======================>', this.formData);
    });
  }

  private findShopStatusFace(shopStatus: string): string {

    let shopStatusFace = '';
    this.pxShopStatusEnum.values.forEach(e => {
      if (e[0] === shopStatus) {
        shopStatusFace = e[1];
      }
    });
    return shopStatusFace;
  }

}
