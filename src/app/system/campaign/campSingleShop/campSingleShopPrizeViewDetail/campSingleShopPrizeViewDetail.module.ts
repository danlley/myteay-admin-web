import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {campSingleShopPrizeViewDetailRouter} from './campSingleShopPrizeViewDetail.router';
import {CampSingleShopPrizeViewDetailComponent} from './campSingleShopPrizeViewDetail.component';
import {DatePipe} from '@angular/common';

@NgModule({
    declarations: [
        CampSingleShopPrizeViewDetailComponent
    ],
    imports: [
        RouterModule.forChild(campSingleShopPrizeViewDetailRouter),
        FormsModule,
        HttpModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [CampSingleShopPrizeViewDetailComponent]
})
export class CampSingleShopPrizeViewDetailModule {
}
