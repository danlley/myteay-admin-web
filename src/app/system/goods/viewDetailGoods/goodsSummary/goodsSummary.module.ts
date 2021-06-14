import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {GoodsSummaryComponent} from './goodsSummary.component';
import {BrowserModule} from '@angular/platform-browser';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';

@NgModule({
    declarations: [
        GoodsSummaryComponent
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [FatigeConfigService],
    bootstrap: [GoodsSummaryComponent]
})
export class GoodsSummaryModule {
}
