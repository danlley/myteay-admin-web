import {TitleComponent} from './title.component';
import {HttpModule} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {EventService} from '../asyncService/asyncService.service';
import {FormsModule} from '@angular/forms';
import {Subject} from 'rxjs/Subject';

@NgModule({
    declarations: [
        TitleComponent,
        Subject,
        EventService
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [Observable, Subject, EventService],
    bootstrap: [TitleComponent]
})
export class TitleModule {
}
