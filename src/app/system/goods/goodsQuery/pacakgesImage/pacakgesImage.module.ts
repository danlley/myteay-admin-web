import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {packagesImageRouter} from './pacakgesImage.router';
import {PacakgesImageComponent} from './pacakgesImage.component';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';


@NgModule({
    declarations: [
        PacakgesImageComponent
    ],
    imports: [
        RouterModule.forChild(packagesImageRouter),
        FormsModule,
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [PacakgesImageComponent]
})
export class PacakgesImageModule {
}
