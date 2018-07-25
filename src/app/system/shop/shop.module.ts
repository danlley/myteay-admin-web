import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FatigeConfigService} from '../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {shopRouter} from './shop.router';
import {ShopComponent} from './shop.component';
import {DatePipe} from '@angular/common';

@NgModule({
    declarations: [
        ShopComponent
    ],
    imports: [
        RouterModule.forChild(shopRouter),
        FormsModule,
        HttpModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [ShopComponent]
})
export class ShopModule {
}
