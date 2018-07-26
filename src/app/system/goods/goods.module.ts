import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FatigeConfigService} from '../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {goodsRouter} from './goods.router';
import {GoodsComponent} from './goods.component';
import {DatePipe} from '@angular/common';

@NgModule({
    declarations: [
        GoodsComponent
    ],
    imports: [
        RouterModule.forChild(goodsRouter),
        FormsModule,
        HttpModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [GoodsComponent]
})
export class GoodsModule {
}
