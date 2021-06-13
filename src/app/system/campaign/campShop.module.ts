import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FatigeConfigService} from '../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {campShopRouter} from './campShop.router';
import {CampShopComponent} from './campShop.component';
import {DatePipe} from '@angular/common';

@NgModule({
    declarations: [
      CampShopComponent
    ],
    imports: [
        RouterModule.forChild(campShopRouter),
        FormsModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [CampShopComponent]
})
export class CampShopModule {
}
