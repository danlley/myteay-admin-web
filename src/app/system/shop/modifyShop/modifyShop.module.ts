import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {modifyShopRouter} from './modifyShop.router';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {ModifyShopComponent} from './modifyShop.component';

@NgModule({
    declarations: [
        ModifyShopComponent
    ],
    imports: [
        RouterModule.forChild(modifyShopRouter),
        FormsModule,
        HttpModule
    ],
    providers: [FatigeConfigService],
    bootstrap: [ModifyShopComponent]
})
export class ModifyShopModule {
}
