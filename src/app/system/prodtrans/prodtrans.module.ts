import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FatigeConfigService} from '../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {prodtransRouter} from './prodtrans.router';
import {ProdtransComponent} from './prodtrans.component';
import {DatePipe} from '@angular/common';

@NgModule({
    declarations: [
        ProdtransComponent
    ],
    imports: [
        RouterModule.forChild(prodtransRouter),
        FormsModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [ProdtransComponent]
})
export class ProdtransModule {
}
