import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {campSingleShopPrizeMngRouter} from './campSingleShopPrizeMng.router';
import {CampSingleShopPrizeMngComponent} from './campSingleShopPrizeMng.component';
import {DatePipe} from '@angular/common';

@NgModule({
    declarations: [
        CampSingleShopPrizeMngComponent
    ],
    imports: [
        RouterModule.forChild(campSingleShopPrizeMngRouter),
        FormsModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [CampSingleShopPrizeMngComponent]
})
export class CampSingleShopPrizeMngModule {
}
