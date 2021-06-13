import {Injectable} from '@angular/core';

@Injectable()
export class CampPrizeTypeEnum {
  values: string[][] = [
    ["CAMP_COMMON_PRIZE", "通用无限制奖品"],
    ["CAMP_PRICE_LIMIT", "价格限制奖品"]
  ];
}
