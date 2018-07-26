import {Routes} from '@angular/router';
import {MtFatigeIndicatorConfigQueryComponent} from './customer/mtFatigeIndicatorConfigQuery/mtFatigeIndicatorConfigQuery.component';
import {DefaultPageComponent} from './defaultPage/defaultPage.component';
import {MessageManagerComponent} from './message/mtMessageManager/messageManager.component';
import {AddMessageConfigComponent} from './message/addMessageConfig/addMessageConfig.component';
import {ModifyMessageConfigModule} from './message/modifyMessageConfig/modifyMessageConfig.module';
import {ModifyMessageConfigComponent} from './message/modifyMessageConfig/modifyMessageConfig.component';
import {SystemComponent} from './system/system.component';
import {ShopComponent} from './system/shop/shop.component';
import {AddShopComponent} from './system/shop/addShop/addShop.component';
import {ModifyShopComponent} from './system/shop/modifyShop/modifyShop.component';
import {ViewDetailShopComponent} from './system/shop/viewDetailShop/viewDetailShop.component';
import {GoodsComponent} from './system/goods/goods.component';
import {GoodsQueryComponent} from './system/goods/goodsQuery/goodsQuery.component';
import {AddGoodsComponent} from './system/goods/addGoods/addGoods.component';

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
