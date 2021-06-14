import {Routes} from '@angular/router';
import {GoodsPackagesComponent} from './goodsPackages.component';

export const goodsPackagesRouter: Routes = [
    {
        path: 'system/goods/packages/all',
        component: GoodsPackagesComponent
    }
];
