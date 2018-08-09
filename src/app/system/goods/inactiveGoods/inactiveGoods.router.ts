import {Routes} from '@angular/router';
import {InactiveGoodsComponent} from './inactiveGoods.component';

export const inActiveGoodsRouter: Routes = [
    {
        path: 'system/goods/view/single',
        component: InactiveGoodsComponent
    }
];
