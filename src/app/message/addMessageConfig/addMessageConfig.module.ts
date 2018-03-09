import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AddMessageConfigComponent} from './addMessageConfig.component';
import {addMessageConfigRouter} from './addMessageConfig.router';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
    declarations: [
        AddMessageConfigComponent
    ],
    imports: [
        RouterModule.forChild(addMessageConfigRouter),
        FormsModule,
        BrowserModule,
        HttpModule
    ],
    providers: [],
    bootstrap: [AddMessageConfigComponent]
})
export class AddMessageConfigModule {
}
