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


@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    SystemSideLeftComponent,
    TableNoPaginatorComponent,
    DefaultPageComponent,
    SystemComponent,
    ShopComponent,
    AddShopComponent,
    ModifyShopComponent,
    ViewDetailShopComponent,
    CampShopComponent,
    CampSingleShopComponent,
    CampSingleShopPrizeMngComponent,
    CampSummaryTableComponent,
    CampSingleShopPrizeAddComponent,
    CampSingleShopPrizeViewDetailComponent,
    CampSingleShopPrizeRefGoodsComponent,
    CampSingleShopPrizeSummaryComponent,
    CampSingleShopPrizeRefGoodsItemComponent,
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
    BottomComponent,
    TitleComponent,
    DatePipe,
    EventService,
    CommonServie,
    FatigeConfigService,
    DefaultPageComponent,
    TableNoPaginatorComponent,
    SystemSideLeftComponent,
    SystemComponent,
    ShopComponent,
    AddShopComponent,
    ModifyShopComponent,
    ViewDetailShopComponent,
    CampShopComponent,
    CampSingleShopComponent,
    CampSingleShopPrizeMngComponent,
    CampSummaryTableComponent,
    CampSingleShopPrizeAddComponent,
    CampSingleShopPrizeViewDetailComponent,
    CampSingleShopPrizeRefGoodsComponent,
    CampSingleShopPrizeSummaryComponent,
    CampSingleShopPrizeRefGoodsItemComponent,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
