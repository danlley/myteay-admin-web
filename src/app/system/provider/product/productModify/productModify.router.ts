import {Routes} from '@angular/router';
import {ProductModifyComponent} from './productModify.component';

export const productModifyRouter: Routes = [
    {
        path: 'system/provider/product/modify',
        component: ProductModifyComponent
    }
];
