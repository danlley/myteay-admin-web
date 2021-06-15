import {Injectable} from '@angular/core';

@Injectable()
export class TcDiscountGoodsTypeEnum {
  values: string[][] = [
    ["PX_SUB_REDUCE_DISCOUNT", "立减折扣"],
    ["PX_SPEC_PRICE_DISCOUNT", "限时特价"],
    ["PX_MULTI_REDUCE_DISCOUNT", "百分比折扣"]
  ];
}
