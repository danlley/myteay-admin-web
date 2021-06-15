import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FatigeConfigService} from '../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {discountRouter} from './discount.router';
import {DiscountComponent} from './discount.component';
import {DatePipe} from '@angular/common';

@NgModule({
    declarations: [
	    DiscountComponent
    ],
    imports: [
        RouterModule.forChild(discountRouter),
        FormsModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [DiscountComponent]
})
export class DiscountModule {
}
