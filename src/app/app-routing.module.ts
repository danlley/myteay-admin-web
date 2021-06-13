import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultPageComponent} from './defaultPage/defaultPage.component';
import {SystemComponent} from './system/system.component';
import {CampShopComponent} from './system/campaign/campShop.component';
import {CampSingleShopComponent} from './system/campaign/campSingleShop/campSingleShop.component';
import {CampSingleShopPrizeMngComponent} from './system/campaign/campSingleShop/campSingleShopPrizeMng/campSingleShopPrizeMng.component';
import {CampSingleShopPrizeAddComponent} from './system/campaign/campSingleShop/campSingleShopPrizeAdd/campSingleShopPrizeAdd.component';
import {CampSingleShopPrizeRefGoodsComponent} from './system/campaign/campSingleShop/campSingleShopPrizeRefGoods/campSingleShopPrizeRefGoods.component';
import {CampSingleShopPrizeViewDetailComponent} from './system/campaign/campSingleShop/campSingleShopPrizeViewDetail/campSingleShopPrizeViewDetail.component';
import {ShopComponent} from './system/shop/shop.component';
import {AddShopComponent} from './system/shop/addShop/addShop.component';
import {ModifyShopComponent} from './system/shop/modifyShop/modifyShop.component';

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
      {
        path: 'system/campaign/prize/add',
        component: CampSingleShopPrizeAddComponent
      },
      {
        path: 'system/campaign/prize/view/detail',
        component: CampSingleShopPrizeViewDetailComponent
      },
      {
        path: 'system/campaign/prize/ref',
        component: CampSingleShopPrizeRefGoodsComponent
      },

      {
        path: 'system/shop',
        component: ShopComponent
      },
      {
        path: 'system/shop/add',
        component: AddShopComponent
      },
      {
        path: 'system/shop/modify',
        component: ModifyShopComponent
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
