import {Injectable} from '@angular/core';

@Injectable()
export class PxGoodsOrderTypeEnum {
  values: string[][] = [
    ["PX_NON_APPOINTMENT", "免预约"],
    ["PX_NEED_APPOINTMENT", "需要预约"],
    ["PX_NOTHING", "无"]
  ];
}
