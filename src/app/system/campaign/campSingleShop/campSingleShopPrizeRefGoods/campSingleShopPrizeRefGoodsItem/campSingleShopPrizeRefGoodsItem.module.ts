import {HttpModule} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {CampSingleShopPrizeRefGoodsItemComponent} from './campSingleShopPrizeRefGoodsItem.component';
import {EventService} from '../../../../../asyncService/asyncService.service';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';

@NgModule({
    declarations: [
        CampSingleShopPrizeRefGoodsItemComponent,
        Subject,
        EventService
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [FatigeConfigService, DatePipe, Observable, Subject, EventService],
    bootstrap: [CampSingleShopPrizeRefGoodsItemComponent]
})
export class CampSingleShopPrizeRefGoodsItemModule {
}
