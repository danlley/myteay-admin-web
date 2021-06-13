import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultPageComponent} from './defaultPage/defaultPage.component';
import {SystemComponent} from './system/system.component';
import {CampShopComponent} from './system/campaign/campShop.component';
import {CampSingleShopComponent} from './system/campaign/campSingleShop/campSingleShop.component';
import {CampSingleShopPrizeMngComponent} from './system/campaign/campSingleShop/campSingleShopPrizeMng/campSingleShopPrizeMng.component';

const routes: Routes = [
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
        path: 'default',
        component: DefaultPageComponent
      },
      {
        path: 'system',
        component: SystemComponent
      },
      {
        path: 'system/campaign',
        component: CampShopComponent
      },
      {
        path: 'system/campaign/single',
        component: CampSingleShopComponent
      },
      {
        path: 'system/campaign/prize',
        component: CampSingleShopPrizeMngComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
