import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {productAddRouter} from './productAdd.router';
import {ProductAddComponent} from './productAdd.component';
import {DatePipe} from '@angular/common';

@NgModule({
    declarations: [
        ProductAddComponent
    ],
    imports: [
        RouterModule.forChild(productAddRouter),
        FormsModule,
        HttpModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [ProductAddComponent]
})
export class ProductAddModule {
}
