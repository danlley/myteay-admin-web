import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {appRouter} from './app.router';
import {TitleComponent} from './titles/title.component';
import {BottomComponent} from './bottom/bottom.component';
import {MtFatigeIndicatorConfigQueryComponent} from './customer/mtFatigeIndicatorConfigQuery/mtFatigeIndicatorConfigQuery.component';
import {DefaultPageComponent} from './defaultPage/defaultPage.component';
import {EventService} from './asyncService/asyncService.service';
import {FatigeConfigService} from './customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {MessageManagerComponent} from './message/mtMessageManager/messageManager.component';
import {AddMessageConfigComponent} from './message/addMessageConfig/addMessageConfig.component';
import {MessageSideLeftComponent} from './message/messageSideLeft/messageSideLeft.component';
import {CustomerSideLeftComponent} from './customer/customerSideLeft/customerSideLeft.component';
import {TableNoPaginatorComponent} from './tableNoPaginator/tableNoPaginator.component';
import {ModifyMessageConfigComponent} from './message/modifyMessageConfig/modifyMessageConfig.component';
import {SystemComponent} from './system/system.component';
import {SystemSideLeftComponent} from './system/systemSideLeft/systemSideLeft.component';
import {ShopComponent} from './system/shop/shop.component';
import {DatePipe} from '@angular/common';
import {AddShopComponent} from './system/shop/addShop/addShop.component';
import {ModifyShopComponent} from './system/shop/modifyShop/modifyShop.component';
import {ViewDetailShopComponent} from './system/shop/viewDetailShop/viewDetailShop.component';
import {GoodsComponent} from './system/goods/goods.component';
import {GoodsQueryComponent} from './system/goods/goodsQuery/goodsQuery.component';
import {AddGoodsComponent} from './system/goods/addGoods/addGoods.component';
import {SummaryTableComponent} from './summaryTable/summaryTable.component';
import {ModifyGoodsComponent} from './system/goods/modifyGoods/modifyGoods.component';
import {ViewDetailGoodsComponent} from './system/goods/viewDetailGoods/viewDetailGoods.component';
import {GoodsPackagesComponent} from './system/goods/goodsQuery/goodsPackages/goodsPackages.component';
import {PacakgesImageComponent} from './system/goods/goodsQuery/pacakgesImage/pacakgesImage.component';
import {FileUploadModule} from 'ng2-file-upload';
import {GoodsSummaryComponent} from './system/goods/viewDetailGoods/goodsSummary/goodsSummary.component';
import {GoodsDetailComponent} from './system/goods/viewDetailGoods/goodsDetail/goodsDetail.component';
import {GoodsDetailImageShowComponent} from './system/goods/viewDetailGoods/goodsDetailImageShow/goodsDetailImageShow.component';
import {GoodsNoticeComponent} from './system/goods/goodsQuery/goodsNotice/goodsNotice.component';
import {GoodsSubNoticeComponent} from './system/goods/goodsQuery/goodsNotice/goodsSubNotice/goodsSubNotice.component';
import {GoodsNoticeShowComponent} from './system/goods/viewDetailGoods/goodsNoticeShow/goodsNoticeShow.component';
import {CommonServie} from './utils/common.servie';
import {ActiveGoodsComponent} from './system/goods/activeGoods/activeGoods.component';
import {InactiveGoodsComponent} from './system/goods/inactiveGoods/inactiveGoods.component';
import {AutoCommitGoodsNoticeService} from './utils/autoCommitGoodsNotice.service';
import {AutoCommitGoodsPackagesService} from './utils/autoCommitGoodsPackages.service';
import {CampShopComponent} from './system/campaign/campShop.component';
import {CampSingleShopComponent} from './system/campaign/campSingleShop/campSingleShop.component';
import {CampSingleShopPrizeMngComponent} from './system/campaign/campSingleShop/campSingleShopPrizeMng/campSingleShopPrizeMng.component';
import {CampSummaryTableComponent} from './system/campaign/campSummaryTable/campSummaryTable.component';
import {CampSingleShopPrizeAddComponent} from './system/campaign/campSingleShop/campSingleShopPrizeAdd/campSingleShopPrizeAdd.component';
import {CampSingleShopPrizeViewDetailComponent} from './system/campaign/campSingleShop/campSingleShopPrizeViewDetail/campSingleShopPrizeViewDetail.component';

@NgModule({
    declarations: [
        AppComponent,
        TitleComponent,
        MtFatigeIndicatorConfigQueryComponent,
        MessageManagerComponent,
        AddMessageConfigComponent,
        ModifyMessageConfigComponent,
        MessageSideLeftComponent,
        CustomerSideLeftComponent,
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
        InactiveGoodsComponent,
        BottomComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRouter),
        FormsModule,
        FileUploadModule,
        HttpModule
    ],
    providers: [
        BottomComponent,
        TitleComponent,
        DatePipe,
        EventService,
        CommonServie,
        FatigeConfigService,
        AutoCommitGoodsNoticeService,
        AutoCommitGoodsPackagesService,
        DefaultPageComponent,
        MessageManagerComponent,
        AddMessageConfigComponent,
        ModifyMessageConfigComponent,
        CustomerSideLeftComponent,
        TableNoPaginatorComponent,
        SummaryTableComponent,
        MessageSideLeftComponent,
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
        InactiveGoodsComponent,
        MtFatigeIndicatorConfigQueryComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
