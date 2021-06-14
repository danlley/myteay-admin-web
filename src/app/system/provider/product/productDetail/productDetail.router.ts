import {Routes} from '@angular/router';
import {ProductDetailComponent} from './productDetail.component';

export const productDetailRouter: Routes = [
    {
        path: 'system/provider/product/detail',
        component: ProductDetailComponent
    }
];
