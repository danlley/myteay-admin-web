import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {goodsCostMngRouter} from './goodsCostMng.router';
import {GoodsCostMngComponent} from './goodsCostMng.component';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';

@NgModule({
    declarations: [
        GoodsCostMngComponent
    ],
    imports: [
        RouterModule.forChild(goodsCostMngRouter),
        FormsModule,
        HttpModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [GoodsCostMngComponent]
})
export class GoodsCostMngModule {
}
