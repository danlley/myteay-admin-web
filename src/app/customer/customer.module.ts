import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CustomerComponent} from './customer.component';
import {RouterModule} from '@angular/router';
import {customerRouter} from './customer.router';

@NgModule({
  declarations: [
    CustomerComponent
  ],
  imports: [
    RouterModule.forChild(customerRouter),
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [CustomerComponent]
})
export class CustomerModule {
}
