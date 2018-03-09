import {HttpModule} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {MessageSideLeftComponent} from './messageSideLeft.component';
import {EventService} from '../../asyncService/asyncService.service';

@NgModule({
    declarations: [
        MessageSideLeftComponent,
        Subject,
        EventService
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [Observable, Subject, EventService],
    bootstrap: [MessageSideLeftComponent]
})
export class MessageSideLeftModule {
}
