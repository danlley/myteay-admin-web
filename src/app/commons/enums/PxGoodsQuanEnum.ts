import {Injectable} from '@angular/core';

@Injectable()
export class PxGoodsQuanEnum {
  values: string[][] = [
    ["PX_HAS_QUAN", "支持优惠券"],
    ["PX_UNHAS_QUAN", "不支持优惠券"]
  ];
}
