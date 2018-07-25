import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SystemComponent} from './system.component';
import {RouterModule} from '@angular/router';
import {systemRouter} from './system.router';

@NgModule({
    declarations: [
        SystemComponent
    ],
    imports: [
        RouterModule.forChild(systemRouter),
        FormsModule,
        HttpModule
    ],
    providers: [],
    bootstrap: [SystemComponent]
})
export class SystemModule {
}
