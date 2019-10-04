import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {nutritionalRouter} from './nutritional.router';
import {NutritionalComponent} from './nutritional.component';
import {DatePipe} from '@angular/common';

@NgModule({
    declarations: [
        NutritionalComponent
    ],
    imports: [
        RouterModule.forChild(nutritionalRouter),
        FormsModule,
        HttpModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [NutritionalComponent]
})
export class NutritionalModule {
}
