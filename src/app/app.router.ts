import {Routes} from '@angular/router';
import {MtFatigeIndicatorConfigQueryComponent} from './customer/mtFatigeIndicatorConfigQuery/mtFatigeIndicatorConfigQuery.component';
import {DefaultPageComponent} from './defaultPage/defaultPage.component';

export const appRouter: Routes = [
  {
    path: '',
    component: DefaultPageComponent,
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
