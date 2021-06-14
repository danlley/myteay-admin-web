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
import {ViewDetailShopComponent} from './system/shop/viewDetailShop/viewDetailShop.component';
import {GoodsComponent} from './system/goods/goods.component';
import {GoodsQueryComponent} from './system/goods/goodsQuery/goodsQuery.component';
import {AddGoodsComponent} from './system/goods/addGoods/addGoods.component';
import {GoodsPackagesComponent} from './system/goods/goodsQuery/goodsPackages/goodsPackages.component';
import {PacakgesImageComponent} from './system/goods/goodsQuery/pacakgesImage/pacakgesImage.component';
import {GoodsNoticeComponent} from './system/goods/goodsQuery/goodsNotice/goodsNotice.component';
import {ActiveGoodsComponent} from './system/goods/activeGoods/activeGoods.component';
import {ViewDetailGoodsComponent} from './system/goods/viewDetailGoods/viewDetailGoods.component';
import {InactiveGoodsComponent} from './system/goods/inactiveGoods/inactiveGoods.component';
import {ModifyGoodsComponent} from './system/goods/modifyGoods/modifyGoods.component';
import {ProdtransComponent} from './system/prodtrans/prodtrans.component';
import {ProdtransUserShopProdComponent} from './system/prodtrans/prodtransUserShopProd/prodtransUserShopProd.component';
import {ProdtransUserShopProdAddComponent} from './system/prodtrans/prodtransUserShopProd/ProdtransUserShopProdAdd/prodtransUserShopProdAdd.component';
import {ProviderComponent} from './system/provider/provider.component';
import {ProductComponent} from './system/provider/product/product.component';
import {ProductAddComponent} from './system/provider/product/productAdd/productAdd.component';
import {ProductDetailComponent} from './system/provider/product/productDetail/productDetail.component';

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
        path: 'system/prodtrans',
        component: ProdtransComponent
      },
      {
        path: 'system/prodtrans/usr/shop/prod',
        component: ProdtransUserShopProdComponent
      },
      {
        path: 'system/prodtrans/usr/shop/prod/add',
        component: ProdtransUserShopProdAddComponent
      },
      {
        path: 'default',
        component: DefaultPageComponent
      },

      {
        path: 'system/provider',
        component: ProviderComponent
      },
      {
        path: 'system/provider/product',
        component: ProductComponent
      },
      {
        path: 'system/provider/product/add',
        component: ProductAddComponent
      },
      {
        path: 'system/provider/product/detail',
        component: ProductDetailComponent
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
        path: 'system/goods/packages/all',
        component: GoodsPackagesComponent
      },
      {
        path: 'system/goods/packages/notice/all',
        component: GoodsNoticeComponent
      },
      {
        path: 'system/goods/packages/image/all',
        component: PacakgesImageComponent
      },

      {
        path: 'system/goods',
        component: GoodsComponent
      },
      {
        path: 'system/goods/all',
        component: GoodsQueryComponent
      },
      {
        path: 'system/goods/add',
        component: AddGoodsComponent
      },
      {
        path: 'system/goods/modify',
        component: ModifyGoodsComponent
      },
      {
        path: 'system/goods/view/detail',
        component: ViewDetailGoodsComponent
      },
      {
        path: 'system/goods/view/active',
        component: ActiveGoodsComponent
      },
      {
        path: 'system/goods/view/inactive',
        component: InactiveGoodsComponent
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
      {
        path: 'system/shop/view/single',
        component: ViewDetailShopComponent
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
