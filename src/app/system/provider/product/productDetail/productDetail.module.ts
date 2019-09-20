import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {productDetailRouter} from './productDetail.router';
import {ProductDetailComponent} from './productDetail.component';
import {DatePipe} from '@angular/common';

@NgModule({
    declarations: [
        ProductDetailComponent
    ],
    imports: [
        RouterModule.forChild(productDetailRouter),
        FormsModule,
        HttpModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [ProductDetailComponent]
})
export class ProductDetailModule {
}
