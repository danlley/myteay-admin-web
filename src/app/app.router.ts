import {Routes} from '@angular/router';
import {MtFatigeIndicatorConfigQueryComponent} from './customer/mtFatigeIndicatorConfigQuery/mtFatigeIndicatorConfigQuery.component';
import {DefaultPageComponent} from './defaultPage/defaultPage.component';
import {MessageManagerComponent} from './message/mtMessageManager/messageManager.component';
import {AddMessageConfigComponent} from './message/addMessageConfig/addMessageConfig.component';
import {ModifyMessageConfigComponent} from './message/modifyMessageConfig/modifyMessageConfig.component';
import {SystemComponent} from './system/system.component';
import {ShopComponent} from './system/shop/shop.component';
import {AddShopComponent} from './system/shop/addShop/addShop.component';
import {ModifyShopComponent} from './system/shop/modifyShop/modifyShop.component';
import {ViewDetailShopComponent} from './system/shop/viewDetailShop/viewDetailShop.component';
import {GoodsComponent} from './system/goods/goods.component';
import {GoodsQueryComponent} from './system/goods/goodsQuery/goodsQuery.component';
import {AddGoodsComponent} from './system/goods/addGoods/addGoods.component';
import {ModifyGoodsComponent} from './system/goods/modifyGoods/modifyGoods.component';
import {ViewDetailGoodsComponent} from './system/goods/viewDetailGoods/viewDetailGoods.component';
import {GoodsPackagesComponent} from './system/goods/goodsQuery/goodsPackages/goodsPackages.component';
import {PacakgesImageComponent} from './system/goods/goodsQuery/pacakgesImage/pacakgesImage.component';
import {GoodsNoticeComponent} from './system/goods/goodsQuery/goodsNotice/goodsNotice.component';
import {ActiveGoodsComponent} from './system/goods/activeGoods/activeGoods.component';
import {InactiveGoodsComponent} from './system/goods/inactiveGoods/inactiveGoods.component';
import {CampShopComponent} from './system/campaign/campShop.component';
import {CampSingleShopComponent} from './system/campaign/campSingleShop/campSingleShop.component';
import {CampSingleShopPrizeMngComponent} from './system/campaign/campSingleShop/campSingleShopPrizeMng/campSingleShopPrizeMng.component';
import {CampSingleShopPrizeAddComponent} from './system/campaign/campSingleShop/campSingleShopPrizeAdd/campSingleShopPrizeAdd.component';
import {CampSingleShopPrizeViewDetailComponent} from './system/campaign/campSingleShop/campSingleShopPrizeViewDetail/campSingleShopPrizeViewDetail.component';
import {CampSingleShopPrizeRefGoodsComponent} from './system/campaign/campSingleShop/campSingleShopPrizeRefGoods/campSingleShopPrizeRefGoods.component';
import {GoodsCostComponent} from './system/cost/goodsCost.component';
import {GoodsCostMngComponent} from './system/cost/goodsCostMng/goodsCostMng.component';
import {ProviderComponent} from './system/provider/provider.component';
import {ProductComponent} from './system/provider/product/product.component';
import {ProductAddComponent} from './system/provider/product/productAdd/productAdd.component';
import {ProductDetailComponent} from './system/provider/product/productDetail/productDetail.component';
import {ProductModifyComponent} from './system/provider/product/productModify/productModify.component';
import {NutritionalComponent} from './system/provider/nutritional/nutritional.component';
import {ManualComponent} from './system/provider/manual/manual.component';
import {PpPriceComponent} from './system/provider/ppPrice/ppPrice.component';
import {DiscountComponent} from './system/discount/discount.component';
import {DisGoodsConfComponent} from './system/discount/disGoodsConf/disGoodsConf.component';
import {AddDisGoodsConfComponent} from './system/discount/disGoodsConf/addDisGoodsConf/addDisGoodsConf.component';
import {ProdtransComponent} from './system/prodtrans/prodtrans.component';
import {ProdtransUserShopProdComponent} from './system/prodtrans/prodtransUserShopProd/prodtransUserShopProd.component';

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
                path: 'system/prodtrans',
                component: ProdtransComponent
            },
            {
                path: 'system/prodtrans/usr/shop/prod',
                component: ProdtransUserShopProdComponent
            },
            {
                path: 'system/discount',
                component: DiscountComponent
            },
            {
                path: 'system/discount/main',
                component: DisGoodsConfComponent
            },
            {
                path: 'system/discount/main/add',
                component: AddDisGoodsConfComponent
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
                path: 'system/provider/nutritional',
                component: NutritionalComponent
            },
            {
                path: 'system/provider/manual',
                component: ManualComponent
            },
            {
                path: 'system/provider/price',
                component: PpPriceComponent
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
                path: 'system/provider/product/modify',
                component: ProductModifyComponent
            },
            {
                path: 'system',
                component: SystemComponent
            },
            {
                path: 'system/goods/cost/mng',
                component: GoodsCostMngComponent
            },
            {
                path: 'system/goods/cost',
                component: GoodsCostComponent
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
            {
                path: 'message/query',
                component: MessageManagerComponent
            },
            {
                path: 'message/add',
                component: AddMessageConfigComponent
            },
            {
                path: 'message/modify',
                component: ModifyMessageConfigComponent
            },
            {
                path: 'default',
                component: DefaultPageComponent
            }
        ]
    }
];
