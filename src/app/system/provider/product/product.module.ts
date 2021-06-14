import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {productRouter} from './product.router';
import {ProductComponent} from './product.component';
import {DatePipe} from '@angular/common';

@NgModule({
    declarations: [
        ProductComponent
    ],
    imports: [
        RouterModule.forChild(productRouter),
        FormsModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [ProductComponent]
})
export class ProductModule {
}
