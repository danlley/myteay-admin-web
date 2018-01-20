import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {appRouter} from './app.router';
import {TitleComponent} from './titles/title.component';
import {BottomComponent} from './bottom/bottom.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    BottomComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forChild(appRouter),
    FormsModule,
    HttpModule
  ],
  providers: [TitleComponent, BottomComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
