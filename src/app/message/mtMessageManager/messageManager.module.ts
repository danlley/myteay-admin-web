import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MessageManagerComponent} from './messageManager.component';
import {messageManagerRouter} from './messageManager.router';

@NgModule({
    declarations: [
        MessageManagerComponent
    ],
    imports: [
        RouterModule.forChild(messageManagerRouter),
        FormsModule,
        HttpModule
    ],
    providers: [],
    bootstrap: [MessageManagerComponent]
})
export class MessageManagerModule {
}
