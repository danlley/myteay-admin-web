import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {campSingleShopPrizeAddRouter} from './campSingleShopPrizeAdd.router';
import {CampSingleShopPrizeAddComponent} from './campSingleShopPrizeAdd.component';
import {DatePipe} from '@angular/common';

@NgModule({
    declarations: [
        CampSingleShopPrizeAddComponent
    ],
    imports: [
        RouterModule.forChild(campSingleShopPrizeAddRouter),
        FormsModule,
        HttpModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [CampSingleShopPrizeAddComponent]
})
export class CampSingleShopPrizeAddModule {
}
