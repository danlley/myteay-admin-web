import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
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
  ],
  providers: [],
  bootstrap: [SystemComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SystemModule {
}
