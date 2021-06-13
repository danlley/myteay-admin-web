import {Injectable} from '@angular/core';

@Injectable()
export class PxShopStatusEnum {
  values: string[][] = [["PX_SHOP_EXPIRED", "店铺已过期"],["PX_SHOP_ONLINE", "店铺在线"]];
}
