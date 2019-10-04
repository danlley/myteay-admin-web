import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {productRouter} from './manual.router';
import {ManualComponent} from './manual.component';
import {DatePipe} from '@angular/common';

@NgModule({
    declarations: [
        ManualComponent
    ],
    imports: [
        RouterModule.forChild(manualRouter),
        FormsModule,
        HttpModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [ManualComponent]
})
export class ManualModule {
}
