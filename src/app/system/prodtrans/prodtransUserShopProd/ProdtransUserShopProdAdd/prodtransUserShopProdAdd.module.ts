import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {prodtransUserShopProdAddComponentRouter} from './prodtransUserShopProdAdd.router';
import {ProdtransUserShopProdAddComponent} from './prodtransUserShopProdAdd.component';
import {DatePipe} from '@angular/common';

@NgModule({
    declarations: [
        ProdtransUserShopProdAddComponent
    ],
    imports: [
        RouterModule.forChild(prodtransUserShopProdAddComponentRouter),
        FormsModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [ProdtransUserShopProdAddComponent]
})
export class ProdtransUserShopProdAddModule {
}
