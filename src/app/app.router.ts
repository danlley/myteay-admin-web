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
                path: 'system',
                component: SystemComponent
            },
            {
                path: 'system/campaign',
                component: CampShopComponent
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
