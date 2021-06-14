import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {manualRouter} from './manual.router';
import {ManualComponent} from './manual.component';
import {DatePipe} from '@angular/common';

@NgModule({
    declarations: [
        ManualComponent
    ],
    imports: [
        RouterModule.forChild(manualRouter),
        FormsModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [ManualComponent]
})
export class ManualModule {
}
