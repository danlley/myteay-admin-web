import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {productModifyRouter} from './productModify.router';
import {ProductModifyComponent} from './productModify.component';
import {DatePipe} from '@angular/common';

@NgModule({
    declarations: [
        ProductModifyComponent
    ],
    imports: [
        RouterModule.forChild(productModifyRouter),
        FormsModule,
        HttpModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [ProductModifyComponent]
})
export class ProductModifyModule {
}
