import {Routes} from '@angular/router';
import {ViewDetailGoodsComponent} from './viewDetailGoods.component';

export const viewDetailGoodsRouter: Routes = [
    {
        path: 'system/goods/view/single',
        component: ViewDetailGoodsComponent
    }
];
