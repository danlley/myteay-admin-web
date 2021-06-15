import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {discountRouter} from './disGoodsConf.router';
import {DisGoodsConfComponent} from './disGoodsConf.component';
import {DatePipe} from '@angular/common';

@NgModule({
    declarations: [
	    DisGoodsConfComponent
    ],
    imports: [
        RouterModule.forChild(discountRouter),
        FormsModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [DisGoodsConfComponent]
})
export class DisGoodsConfModule {
}
