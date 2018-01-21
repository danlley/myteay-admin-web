import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {DefaultPageComponent} from './defaultPage.component';
import {defaultPageRouter} from './defaultPage.router';

@NgModule({
  declarations: [
    DefaultPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forChild(defaultPageRouter),
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [DefaultPageComponent]
})
export class DefaultPageModule {
}
