import {Injectable} from '@angular/core';

@Injectable()
export class PxGoodsStatusEnum {
  values: string[][] = [
    ['PX_GOODS_DRAFT', '草稿'],
    ['PX_GOODS_ONLINE', '已发布'],
    ['PX_GOODS_OFFLINE', '已下架']
  ];
}
