import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {activeGoodsRouter} from './activeGoods.router';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {ActiveGoodsComponent} from './activeGoods.component';

@NgModule({
    declarations: [
        ActiveGoodsComponent
    ],
    imports: [
        RouterModule.forChild(activeGoodsRouter),
        FormsModule
    ],
    providers: [FatigeConfigService],
    bootstrap: [ActiveGoodsComponent]
})
export class ActiveGoodsModule {
}
