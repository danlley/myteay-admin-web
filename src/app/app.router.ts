import {Routes} from '@angular/router';
import {MtFatigeIndicatorConfigQueryComponent} from './customer/mtFatigeIndicatorConfigQuery/mtFatigeIndicatorConfigQuery.component';
import {DefaultPageComponent} from './defaultPage/defaultPage.component';
import {AppComponent} from './app.component';

export const appRouter: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        redirectTo: 'default',
        pathMatch: 'full'
      },
      {
        path: 'customer/query',
        component: MtFatigeIndicatorConfigQueryComponent
      },
      {
        path: 'default',
        component: DefaultPageComponent
      }
    ]
  }
];
