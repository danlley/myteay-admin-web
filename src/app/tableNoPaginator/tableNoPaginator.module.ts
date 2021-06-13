import {Observable, Subject} from 'rxjs';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {TableNoPaginatorComponent} from './tableNoPaginator.component';
import {EventService} from '../asyncService/asyncService.service';

@NgModule({
  declarations: [
    TableNoPaginatorComponent,
    Subject,
    EventService
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [Observable, Subject, EventService],
  bootstrap: [TableNoPaginatorComponent]
})
export class TableNoPaginatorModule {
}
