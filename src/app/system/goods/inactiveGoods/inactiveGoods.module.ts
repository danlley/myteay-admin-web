import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {inActiveGoodsRouter} from './inactiveGoods.router';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {InactiveGoodsComponent} from './inactiveGoods.component';

@NgModule({
    declarations: [
        InactiveGoodsComponent
    ],
    imports: [
        RouterModule.forChild(inActiveGoodsRouter),
        FormsModule
    ],
    providers: [FatigeConfigService],
    bootstrap: [InactiveGoodsComponent]
})
export class ActiveGoodsModule {
}
