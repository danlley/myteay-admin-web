import {Routes} from '@angular/router';
import {ActiveGoodsComponent} from './activeGoods.component';

export const activeGoodsRouter: Routes = [
    {
        path: 'system/goods/view/single',
        component: ActiveGoodsComponent
    }
];
