import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {mtFatigeIndicatorConfigQueryRouter} from './mtFatigeIndicatorConfigQuery.router';

@NgModule({
  declarations: [
    MtFatigeIndicatorConfigQueryModule
  ],
  imports: [
    RouterModule.forChild(mtFatigeIndicatorConfigQueryRouter),
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [MtFatigeIndicatorConfigQueryModule]
})
export class MtFatigeIndicatorConfigQueryModule {
}
