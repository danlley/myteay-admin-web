import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {addGoodsRouter} from './addGoods.router';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {AddGoodsComponent} from './addGoods.component';

@NgModule({
    declarations: [
        AddGoodsComponent
    ],
    imports: [
        RouterModule.forChild(addGoodsRouter),
        FormsModule
    ],
    providers: [FatigeConfigService],
    bootstrap: [AddGoodsComponent]
})
export class AddGoodsModule {
}
