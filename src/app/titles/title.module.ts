import {TitleComponent} from './title.component';
import {Observable, Subject} from 'rxjs';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {EventService} from '../asyncService/asyncService.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    TitleComponent,
    Subject,
    EventService
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [Observable, Subject, EventService],
  bootstrap: [TitleComponent]
})
export class TitleModule {
}
