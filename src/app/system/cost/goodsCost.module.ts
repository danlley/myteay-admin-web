import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FatigeConfigService} from '../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {goodsCostRouter} from './goodsCost.router';
import {GoodsCostComponent} from './goodsCost.component';
import {DatePipe} from '@angular/common';

@NgModule({
    declarations: [
        GoodsCostComponent
    ],
    imports: [
        RouterModule.forChild(goodsCostRouter),
        FormsModule,
        HttpModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [GoodsCostComponent]
})
export class GoodsCostModule {
}
