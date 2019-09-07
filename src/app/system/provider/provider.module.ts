import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FatigeConfigService} from '../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {providerRouter} from './provider.router';
import {ProviderComponent} from './provider.component';
import {DatePipe} from '@angular/common';

@NgModule({
    declarations: [
        ProviderComponent
    ],
    imports: [
        RouterModule.forChild(providerRouter),
        FormsModule,
        HttpModule
    ],
    providers: [FatigeConfigService, DatePipe],
    bootstrap: [ProviderComponent]
})
export class ProviderModule {
}
