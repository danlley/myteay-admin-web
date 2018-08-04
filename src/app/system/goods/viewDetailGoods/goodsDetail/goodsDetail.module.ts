import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {GoodsDetailComponent} from './goodsDetail.component';
import {BrowserModule} from '@angular/platform-browser';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';

@NgModule({
    declarations: [
        GoodsDetailComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [FatigeConfigService],
    bootstrap: [GoodsDetailComponent]
})
export class GoodsDetailModule {
}
