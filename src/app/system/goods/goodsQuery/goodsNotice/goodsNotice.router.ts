import {Routes} from '@angular/router';
import {GoodsNoticeComponent} from './goodsNotice.component';

export const goodsPackagesNoticeRouter: Routes = [
    {
        path: 'system/goods/packages/notice/all',
        component: GoodsNoticeComponent
    }
];
