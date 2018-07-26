import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {viewDetailGoodsRouter} from './viewDetailGoods.router';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {ViewDetailGoodsComponent} from './viewDetailGoods.component';

@NgModule({
    declarations: [
        ViewDetailGoodsComponent
    ],
    imports: [
        RouterModule.forChild(viewDetailGoodsRouter),
        FormsModule,
        HttpModule
    ],
    providers: [FatigeConfigService],
    bootstrap: [ViewDetailGoodsComponent]
})
export class ViewDetailGoodsModule {
}
