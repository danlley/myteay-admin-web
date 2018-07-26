import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {goodsQueryRouter} from './goodsQuery.router';
import {GoodsQueryComponent} from './goodsQuery.component';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';

@NgModule({
    declarations: [
        GoodsQueryComponent
    ],
    imports: [
        RouterModule.forChild(goodsQueryRouter),
        FormsModule,
        HttpModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [GoodsQueryComponent]
})
export class GoodsQueryModule {
}
