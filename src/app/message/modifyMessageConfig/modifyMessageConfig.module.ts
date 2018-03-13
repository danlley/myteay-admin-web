import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {ModifyMessageConfigComponent} from './modifyMessageConfig.component';
import {modifyMessageConfigRouter} from './modifyMessageConfig.router';

@NgModule({
    declarations: [
        ModifyMessageConfigComponent
    ],
    imports: [
        RouterModule.forChild(modifyMessageConfigRouter),
        FormsModule,
        BrowserModule,
        HttpModule
    ],
    providers: [],
    bootstrap: [ModifyMessageConfigComponent]
})
export class ModifyMessageConfigModule {
}
