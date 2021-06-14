import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {prodtransUserShopProdRouter} from './prodtransUserShopProd.router';
import {ProdtransUserShopProdComponent} from './prodtransUserShopProd.component';
import {DatePipe} from '@angular/common';

@NgModule({
    declarations: [
        ProdtransUserShopProdComponent
    ],
    imports: [
        RouterModule.forChild(prodtransUserShopProdRouter),
        FormsModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [ProdtransUserShopProdComponent]
})
export class ProdtransUserShopProdModule {
}
