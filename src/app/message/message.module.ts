import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MessageComponent} from './message.component';
import {messageRouter} from './message.router';

@NgModule({
    declarations: [
        MessageComponent
    ],
    imports: [
        RouterModule.forChild(messageRouter),
        FormsModule,
        HttpModule
    ],
    providers: [],
    bootstrap: [MessageComponent]
})
export class MessageModule {
}
