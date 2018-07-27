import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {goodsPackagesRouter} from './goodsPackages.router';
import {GoodsPackagesComponent} from './goodsPackages.component';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';

@NgModule({
    declarations: [
        GoodsPackagesComponent
    ],
    imports: [
        RouterModule.forChild(goodsPackagesRouter),
        FormsModule,
        HttpModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [GoodsPackagesComponent]
})
export class GoodsPackagesModule {
}
