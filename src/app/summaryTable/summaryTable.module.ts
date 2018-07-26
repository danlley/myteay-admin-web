import {HttpModule} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {TableNoPaginatorComponent} from './summaryTable.component';
import {EventService} from '../asyncService/asyncService.service';

@NgModule({
    declarations: [
        TableNoPaginatorComponent,
        Subject,
        EventService
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [Observable, Subject, EventService],
    bootstrap: [TableNoPaginatorComponent]
})
export class SummaryTableModule {
}
