import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {DatePipe} from '@angular/common';
import {CommonServie} from '../../../../utils/common.servie';
import {EventService} from '../../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../../model/product';

@Component({
  selector: 'app-system-provider-product-add',
  templateUrl: './productAdd.component.html',
  styleUrls: ['./productAdd.component.css']
})

/**
 * 原材料新增组件
 */
export class ProductAddComponent implements OnInit {
  title = '原材料新增!';
  contactKey: string;
  templateConfigList: any[];
  shopId;
  shopData;
  errMsg;
  isNeedShowErrMsg;
  product: Product = new Product();

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
  constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe, private commonService: CommonServie,
              public activeRoute: ActivatedRoute, private eventBus: EventService) {

    const data = this.activeRoute.snapshot.queryParams['data'];
    this.shopData = data;
    this.shopId = this.shopData[0];
    console.log('原材料管理：', this.shopData[0]);
    this.product.muslimFlag = 'MUSLIM_PRODUCT';
  }

  /**
   * 初始化组件
   */
  ngOnInit(): void {
    console.log(this.title);
  }


  doAddShopProduct() {
    console.log('this.product------------------------->', this.product);
    this.product.operationType = 'PX_ADD';
    this.product.shopId = this.shopId;
    this.ftConfitService.addProviderProduct(this.product).subscribe(res => {
      console.log('=======================>', res);
      this.errMsg = '';
      const data = res;
      if (data.operateResult !== 'CAMP_OPERATE_SUCCESS') {
        this.isNeedShowErrMsg = true;
        this.errMsg = '保存原材料出错---------> 错误码:' + data.errorCode + '　　　　　　错误详情:' + data.errorDetail;
      } else {
        this.eventBus.publish('system_provider_product_listener', this.shopData);
      }
    });
  }

  goReturn() {
    this.eventBus.publish('system_provider_product', this.shopData);
  }
}
