import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {addShopRouter} from './addShop.router';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {AddShopComponent} from './addShop.component';

@NgModule({
    declarations: [
        AddShopComponent
    ],
    imports: [
        RouterModule.forChild(addShopRouter),
        FormsModule
    ],
    providers: [FatigeConfigService],
    bootstrap: [AddShopComponent]
})
export class AddShopModule {
}
