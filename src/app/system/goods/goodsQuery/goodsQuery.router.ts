import {Routes} from '@angular/router';
import {GoodsQueryComponent} from './goodsQuery.component';

export const goodsQueryRouter: Routes = [
    {
        path: 'system/goods/all',
        component: GoodsQueryComponent
    }
];
