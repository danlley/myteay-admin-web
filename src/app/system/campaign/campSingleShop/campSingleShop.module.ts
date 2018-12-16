import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {campSingleShopRouter} from './campSingleShop.router';
import {CampSingleShopComponent} from './campSingleShop.component';
import {DatePipe} from '@angular/common';

@NgModule({
    declarations: [
        CampSingleShopComponent
    ],
    imports: [
        RouterModule.forChild(campSingleShopRouter),
        FormsModule,
        HttpModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [CampSingleShopComponent]
})
export class CampShopModule {
}
