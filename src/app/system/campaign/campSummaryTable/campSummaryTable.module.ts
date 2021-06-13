import {Observable, Subject} from 'rxjs';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {CampSummaryTableComponent} from './campSummaryTable.component';
import {EventService} from '../../../asyncService/asyncService.service';

@NgModule({
  declarations: [
    CampSummaryTableComponent,
    Subject,
    EventService
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [Observable, Subject, EventService],
  bootstrap: [CampSummaryTableComponent]
})
export class CampSummaryTableModule {
}
