import {Routes} from '@angular/router';
import {MtFatigeIndicatorConfigQueryComponent} from './customer/mtFatigeIndicatorConfigQuery/mtFatigeIndicatorConfigQuery.component';
import {DefaultPageComponent} from './defaultPage/defaultPage.component';
import {MessageManagerComponent} from './message/mtMessageManager/messageManager.component';
import {AddMessageConfigComponent} from './message/addMessageConfig/addMessageConfig.component';
import {ModifyMessageConfigModule} from './message/modifyMessageConfig/modifyMessageConfig.module';
import {ModifyMessageConfigComponent} from './message/modifyMessageConfig/modifyMessageConfig.component';
import {SystemComponent} from './system/system.component';
import {ShopComponent} from './system/shop/shop.component';

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
                path: 'system/shop',
                component: ShopComponent
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
