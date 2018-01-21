import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {appRouter} from './app.router';
import {TitleComponent} from './titles/title.component';
import {BottomComponent} from './bottom/bottom.component';
import {MtFatigeIndicatorConfigQueryComponent} from './customer/mtFatigeIndicatorConfigQuery/mtFatigeIndicatorConfigQuery.component';
import {DefaultPageComponent} from './defaultPage/defaultPage.component';
import {EventService} from './asyncService/asyncService.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    MtFatigeIndicatorConfigQueryComponent,
    DefaultPageComponent,
    BottomComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRouter),
    FormsModule,
    HttpModule
  ],
  providers: [BottomComponent,
    TitleComponent,
    EventService,
    DefaultPageComponent,
    MtFatigeIndicatorConfigQueryComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
