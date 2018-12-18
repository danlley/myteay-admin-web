import {HttpModule} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {CampSingleShopPrizeSummaryComponent} from './campSingleShopPrizeSummary.component';
import {EventService} from '../../../../../asyncService/asyncService.service';

@NgModule({
    declarations: [
        CampSingleShopPrizeSummaryComponent,
        Subject,
        EventService
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [Observable, Subject, EventService],
    bootstrap: [CampSingleShopPrizeSummaryComponent]
})
export class CampSummaryTableModule {
}
