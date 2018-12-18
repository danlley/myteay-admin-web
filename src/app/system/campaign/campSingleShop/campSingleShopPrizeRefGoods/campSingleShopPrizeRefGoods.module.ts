import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {campSingleShopPrizeRefRouter} from './campSingleShopPrizeRefGoods.router';
import {CampSingleShopPrizeRefGoodsComponent} from './campSingleShopPrizeRefGoods.component';
import {DatePipe} from '@angular/common';

@NgModule({
    declarations: [
        CampSingleShopPrizeRefGoodsComponent
    ],
    imports: [
        RouterModule.forChild(campSingleShopPrizeRefRouter),
        FormsModule,
        HttpModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [CampSingleShopPrizeRefGoodsComponent]
})
export class CampSingleShopPrizeRefGoodsModule {
}
