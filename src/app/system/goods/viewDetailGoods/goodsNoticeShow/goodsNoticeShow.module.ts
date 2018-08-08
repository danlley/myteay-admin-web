import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {GoodsNoticeShowComponent} from './goodsNoticeShow.component';
import {BrowserModule} from '@angular/platform-browser';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';

@NgModule({
    declarations: [
        GoodsNoticeShowComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [FatigeConfigService],
    bootstrap: [GoodsNoticeShowComponent]
})
export class GoodsNoticeShowModule {
}
