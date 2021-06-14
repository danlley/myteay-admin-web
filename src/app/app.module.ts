import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TitleComponent} from './titles/title.component';
import {BottomComponent} from './bottom/bottom.component';
import {DatePipe} from '@angular/common';
import {NgxQRCodeModule} from '@techiediaries/ngx-qrcode';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {EventService} from './asyncService/asyncService.service';
import {DefaultPageComponent} from './defaultPage/defaultPage.component';
import {SystemComponent} from './system/system.component';
import {SystemSideLeftComponent} from './system/systemSideLeft/systemSideLeft.component';
import {CampShopComponent} from './system/campaign/campShop.component';
import {CommonServie} from './utils/common.servie';
import {FatigeConfigService} from './customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {TableNoPaginatorComponent} from './tableNoPaginator/tableNoPaginator.component';
import {CampSingleShopComponent} from './system/campaign/campSingleShop/campSingleShop.component';
import {CampSingleShopPrizeMngComponent} from './system/campaign/campSingleShop/campSingleShopPrizeMng/campSingleShopPrizeMng.component';
import {CampSingleShopPrizeAddComponent} from './system/campaign/campSingleShop/campSingleShopPrizeAdd/campSingleShopPrizeAdd.component';
import {CampSummaryTableComponent} from './system/campaign/campSummaryTable/campSummaryTable.component';
import {CampSingleShopPrizeRefGoodsComponent} from './system/campaign/campSingleShop/campSingleShopPrizeRefGoods/campSingleShopPrizeRefGoods.component';
import {CampSingleShopPrizeSummaryComponent} from './system/campaign/campSingleShop/campSingleShopPrizeRefGoods/campSingleShopPrizeSummary/campSingleShopPrizeSummary.component';
import {CampSingleShopPrizeRefGoodsItemComponent} from './system/campaign/campSingleShop/campSingleShopPrizeRefGoods/campSingleShopPrizeRefGoodsItem/campSingleShopPrizeRefGoodsItem.component';
import {PxShopStatusEnum} from './commons/enums/PxShopStatusEnum';
import {CampStatusEnum} from './commons/enums/CampStatusEnum';
import {CampPrizeStatusEnum} from './commons/enums/CampPrizeStatusEnum';
import {CampSingleShopPrizeViewDetailComponent} from './system/campaign/campSingleShop/campSingleShopPrizeViewDetail/campSingleShopPrizeViewDetail.component';
import {CampPrizeLimitEnum} from './commons/enums/CampPrizeLimitEnum';
import {CampPrizeTypeEnum} from './commons/enums/CampPrizeTypeEnum';
import {ShopComponent} from './system/shop/shop.component';
import {AddShopComponent} from './system/shop/addShop/addShop.component';
import {ModifyShopComponent} from './system/shop/modifyShop/modifyShop.component';
import {ViewDetailShopComponent} from './system/shop/viewDetailShop/viewDetailShop.component';
import {GoodsComponent} from './system/goods/goods.component';
import {GoodsQueryComponent} from './system/goods/goodsQuery/goodsQuery.component';
import {PxGoodsStatusEnum} from './commons/enums/PxGoodsStatusEnum';
import {SummaryTableComponent} from './summaryTable/summaryTable.component';
import {AddGoodsComponent} from './system/goods/addGoods/addGoods.component';
import {PxGoodsTypeEnum} from './commons/enums/PxGoodsTypeEnum';
import {PxGoodsTuanEnum} from './commons/enums/PxGoodsTuanEnum';
import {PxGoodsQuanEnum} from './commons/enums/PxGoodsQuanEnum';
import {PxGoodsHuiyuanEnum} from './commons/enums/PxGoodsHuiyuanEnum';
import {PxGoodsOrderTypeEnum} from './commons/enums/PxGoodsOrderTypeEnum';
import {GoodsPackagesComponent} from './system/goods/goodsQuery/goodsPackages/goodsPackages.component';
import {AutoCommitGoodsPackagesService} from './utils/autoCommitGoodsPackages.service';
import {PxSubPackagesTypeEnum} from './commons/enums/PxSubPackagesTypeEnum';
import {PacakgesImageComponent} from './system/goods/goodsQuery/pacakgesImage/pacakgesImage.component';
import {GoodsNoticeComponent} from './system/goods/goodsQuery/goodsNotice/goodsNotice.component';
import {AutoCommitGoodsNoticeService} from './utils/autoCommitGoodsNotice.service';
import {GoodsSubNoticeComponent} from './system/goods/goodsQuery/goodsNotice/goodsSubNotice/goodsSubNotice.component';
import {ActiveGoodsComponent} from './system/goods/activeGoods/activeGoods.component';
import {ViewDetailGoodsComponent} from './system/goods/viewDetailGoods/viewDetailGoods.component';
import {GoodsSummaryComponent} from './system/goods/viewDetailGoods/goodsSummary/goodsSummary.component';
import {GoodsDetailImageShowComponent} from './system/goods/viewDetailGoods/goodsDetailImageShow/goodsDetailImageShow.component';
import {GoodsDetailComponent} from './system/goods/viewDetailGoods/goodsDetail/goodsDetail.component';
import {GoodsNoticeShowComponent} from './system/goods/viewDetailGoods/goodsNoticeShow/goodsNoticeShow.component';
import {InactiveGoodsComponent} from './system/goods/inactiveGoods/inactiveGoods.component';
import {ModifyGoodsComponent} from './system/goods/modifyGoods/modifyGoods.component';
import {ProdtransComponent} from './system/prodtrans/prodtrans.component';
import {ProdtransUserShopProdComponent} from './system/prodtrans/prodtransUserShopProd/prodtransUserShopProd.component';
import {ProdtransUserShopProdAddComponent} from './system/prodtrans/prodtransUserShopProd/ProdtransUserShopProdAdd/prodtransUserShopProdAdd.component';
import {TcProdtransTypeEnum} from './commons/enums/TcProdtransTypeEnum';
import {ProviderComponent} from './system/provider/provider.component';
import {ProductComponent} from './system/provider/product/product.component';
import {ProductAddComponent} from './system/provider/product/productAdd/productAdd.component';
import {ProductDetailComponent} from './system/provider/product/productDetail/productDetail.component';
import {ProductModifyComponent} from './system/provider/product/productModify/productModify.component';
import {ManualComponent} from './system/provider/manual/manual.component';


@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    SystemSideLeftComponent,
    TableNoPaginatorComponent,
    SummaryTableComponent,
    DefaultPageComponent,
    SystemComponent,
    ShopComponent,
    AddShopComponent,
    ModifyShopComponent,
    ViewDetailShopComponent,
    GoodsComponent,
    GoodsQueryComponent,
    AddGoodsComponent,
    ModifyGoodsComponent,
    ViewDetailGoodsComponent,
    GoodsPackagesComponent,
    PacakgesImageComponent,
    GoodsSummaryComponent,
    GoodsDetailComponent,
    GoodsNoticeComponent,
    GoodsSubNoticeComponent,
    GoodsNoticeShowComponent,
    GoodsDetailImageShowComponent,
    ActiveGoodsComponent,
    CampShopComponent,
    CampSingleShopComponent,
    CampSingleShopPrizeMngComponent,
    CampSummaryTableComponent,
    CampSingleShopPrizeAddComponent,
    CampSingleShopPrizeViewDetailComponent,
    CampSingleShopPrizeRefGoodsComponent,
    CampSingleShopPrizeSummaryComponent,
    CampSingleShopPrizeRefGoodsItemComponent,
    InactiveGoodsComponent,
    ProviderComponent,
    ProductComponent,
    ProductAddComponent,
    ProductDetailComponent,
    ProductModifyComponent,
    ManualComponent,
    ProdtransComponent,
    ProdtransUserShopProdComponent,
    ProdtransUserShopProdAddComponent,
    BottomComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxQRCodeModule,
    BrowserAnimationsModule,
    ModalModule.forRoot()
  ],
  providers: [
    PxShopStatusEnum,
    CampStatusEnum,
    CampPrizeStatusEnum,
    CampPrizeLimitEnum,
    CampPrizeTypeEnum,
    PxGoodsStatusEnum,
    PxGoodsTypeEnum,
    PxGoodsTuanEnum,
    PxGoodsQuanEnum,
    PxGoodsHuiyuanEnum,
    PxGoodsOrderTypeEnum,
    PxSubPackagesTypeEnum,
    TcProdtransTypeEnum,
    BottomComponent,
    TitleComponent,
    DatePipe,
    EventService,
    CommonServie,
    FatigeConfigService,
    AutoCommitGoodsNoticeService,
    AutoCommitGoodsPackagesService,
    DefaultPageComponent,
    TableNoPaginatorComponent,
    SummaryTableComponent,
    SystemSideLeftComponent,
    SystemComponent,
    ShopComponent,
    AddShopComponent,
    ModifyShopComponent,
    ViewDetailShopComponent,
    GoodsComponent,
    GoodsQueryComponent,
    AddGoodsComponent,
    ModifyGoodsComponent,
    ViewDetailGoodsComponent,
    GoodsPackagesComponent,
    PacakgesImageComponent,
    GoodsSummaryComponent,
    GoodsDetailComponent,
    GoodsDetailImageShowComponent,
    GoodsNoticeComponent,
    GoodsSubNoticeComponent,
    GoodsNoticeShowComponent,
    ActiveGoodsComponent,
    CampShopComponent,
    CampSingleShopComponent,
    CampSingleShopPrizeMngComponent,
    CampSummaryTableComponent,
    CampSingleShopPrizeAddComponent,
    CampSingleShopPrizeViewDetailComponent,
    CampSingleShopPrizeRefGoodsComponent,
    CampSingleShopPrizeSummaryComponent,
    CampSingleShopPrizeRefGoodsItemComponent,
    InactiveGoodsComponent,
    ProviderComponent,
    ProductComponent,
    ProductAddComponent,
    ProductDetailComponent,
    ProductModifyComponent,
    ManualComponent,
    ProdtransComponent,
    ProdtransUserShopProdComponent,
    ProdtransUserShopProdAddComponent,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
