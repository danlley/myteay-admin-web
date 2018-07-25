import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {viewShopRouter} from './viewDetailShop.router';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {ViewDetailShopComponent} from './viewDetailShop.component';

@NgModule({
    declarations: [
        ViewDetailShopComponent
    ],
    imports: [
        RouterModule.forChild(viewShopRouter),
        FormsModule,
        HttpModule
    ],
    providers: [FatigeConfigService],
    bootstrap: [ViewDetailShopComponent]
})
export class ViewDetailShopModule {
}
