import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {priceRouter} from './ppPrice.router';
import {PpPriceComponent} from './ppPrice.component';
import {DatePipe} from '@angular/common';

@NgModule({
    declarations: [
        PpPriceComponent
    ],
    imports: [
        RouterModule.forChild(priceRouter),
        FormsModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [PpPriceComponent]
})
export class PpPriceModule {
}
