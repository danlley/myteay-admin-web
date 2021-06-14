import {Observable, Subject} from 'rxjs';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {SummaryTableComponent} from './summaryTable.component';
import {EventService} from '../asyncService/asyncService.service';

@NgModule({
  declarations: [
    SummaryTableComponent,
    Subject,
    EventService
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [Observable, Subject, EventService],
  bootstrap: [SummaryTableComponent]
})
export class SummaryTableModule {
}
