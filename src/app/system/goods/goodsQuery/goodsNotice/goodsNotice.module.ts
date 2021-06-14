import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {goodsPackagesNoticeRouter} from './goodsNotice.router';
import {GoodsNoticeComponent} from './goodsNotice.component';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';

@NgModule({
    declarations: [
        GoodsNoticeComponent
    ],
    imports: [
        RouterModule.forChild(goodsPackagesNoticeRouter),
        FormsModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [GoodsNoticeComponent]
})
export class GoodsNoticeModule {
}
