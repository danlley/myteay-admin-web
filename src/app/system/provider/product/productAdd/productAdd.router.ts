import {Routes} from '@angular/router';
import {ProductAddComponent} from './productAdd.component';

export const productAddRouter: Routes = [
    {
        path: 'system/provider/product',
        component: ProductAddComponent
    }
];
