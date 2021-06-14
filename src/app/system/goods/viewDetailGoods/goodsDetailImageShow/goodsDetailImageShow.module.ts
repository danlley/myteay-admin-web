import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {GoodsDetailImageShowComponent} from './goodsDetailImageShow.component';
import {BrowserModule} from '@angular/platform-browser';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';

@NgModule({
    declarations: [
        GoodsDetailImageShowComponent
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [FatigeConfigService],
    bootstrap: [GoodsDetailImageShowComponent]
})
export class GoodsDetailImageShowModule {
}
