import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {mtFatigeIndicatorConfigQueryRouter} from './mtFatigeIndicatorConfigQuery.router';
import {FatigeConfigService} from './service/fatigeConfig.service';

@NgModule({
  declarations: [
    MtFatigeIndicatorConfigQueryModule
  ],
  imports: [
    RouterModule.forChild(mtFatigeIndicatorConfigQueryRouter),
    FormsModule,
    HttpModule
  ],
  providers: [FatigeConfigService],
  bootstrap: [MtFatigeIndicatorConfigQueryModule]
})
export class MtFatigeIndicatorConfigQueryModule {
}
