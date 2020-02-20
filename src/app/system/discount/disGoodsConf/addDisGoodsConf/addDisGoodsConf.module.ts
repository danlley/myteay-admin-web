import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {addDisGoodsConfRouter} from './addDisGoodsConf.router';
import {AddDisGoodsConfComponent} from './addDisGoodsConf.component';
import {DatePipe} from '@angular/common';

@NgModule({
    declarations: [
        AddDisGoodsConfComponent
    ],
    imports: [
        RouterModule.forChild(addDisGoodsConfRouter),
        FormsModule,
        HttpModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [AddDisGoodsConfComponent]
})
export class AddDisGoodsConfModule {
}
