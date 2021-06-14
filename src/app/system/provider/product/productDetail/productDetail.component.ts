import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {DatePipe} from '@angular/common';
import {CommonServie} from '../../../../utils/common.servie';
import {EventService} from '../../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../../model/product';

@Component({
  selector: 'app-system-provider-product-detail',
  templateUrl: './productDetail.component.html',
  styleUrls: ['./productDetail.component.css']
})

/**
 * 原材料详情组件
 */
export class ProductDetailComponent implements OnInit {
  title = '原材料详情!';
  contactKey: string;
  templateConfigList: any[];
  shopId;
  shopData;
  errMsg;
  isNeedShowErrMsg;
  productId;
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
    this.shopId = this.shopData[0].split(',')[0];
    this.productId = this.shopData[1].split(',')[0];
    console.log('原材料详情参数列表：', this.shopData);

  }

  /**
   * 初始化组件
   */
  ngOnInit(): void {
    console.log(this.title);
    this.doQueryShopProduct();
  }


  doQueryShopProduct() {
    console.log('this.product------------------------->', this.product);
    this.product.operationType = 'PX_QUERY_ONE';
    this.product.shopId = this.shopId;
    this.product.id = this.productId;
    this.ftConfitService.addProviderProduct(this.product).subscribe(res => {

      this.errMsg = '';
      const data = res;
      console.log('this.product------------------------->', data);
      if (data.operateResult !== 'CAMP_OPERATE_SUCCESS') {
        this.isNeedShowErrMsg = true;
        this.errMsg = '保存原材料出错---------> 错误码:' + data.errorCode + '　　　　　　错误详情:' + data.errorDetail;
      } else {
        this.product = data.result;
        console.log('=======================>', res);
      }
    });
  }

  goReturn() {
    this.eventBus.publish('system_provider_product', this.shopData[0].split(','));
  }
}
