import {Routes} from '@angular/router';
import {AddGoodsComponent} from './addGoods.component';

export const addGoodsRouter: Routes = [
    {
        path: 'system/goods/add',
        component: AddGoodsComponent
    }
];
