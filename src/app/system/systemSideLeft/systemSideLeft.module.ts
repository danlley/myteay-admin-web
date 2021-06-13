import {Observable, Subject} from 'rxjs';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {SystemSideLeftComponent} from './systemSideLeft.component';
import {EventService} from '../../asyncService/asyncService.service';

@NgModule({
  declarations: [
    SystemSideLeftComponent,
    Subject,
    EventService
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [Observable, Subject, EventService],
  bootstrap: [SystemSideLeftComponent]
})
export class SystemSideLeftModule {
}
