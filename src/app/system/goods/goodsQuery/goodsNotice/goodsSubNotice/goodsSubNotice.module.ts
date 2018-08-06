import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {GoodsSubNoticeComponent} from './goodsSubNotice.component';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';

@NgModule({
    declarations: [
        GoodsSubNoticeComponent
    ],
    imports: [
        FormsModule,
        HttpModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [GoodsSubNoticeComponent]
})
export class GoodsSubNoticeModule {
}
