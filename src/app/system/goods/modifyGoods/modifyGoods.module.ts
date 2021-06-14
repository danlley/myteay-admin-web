import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {modifyGoodsRouter} from './modifyGoods.router';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {ModifyGoodsComponent} from './modifyGoods.component';

@NgModule({
    declarations: [
        ModifyGoodsComponent
    ],
    imports: [
        RouterModule.forChild(modifyGoodsRouter),
        FormsModule
    ],
    providers: [FatigeConfigService],
    bootstrap: [ModifyGoodsComponent]
})
export class AddGoodsModule {
}
