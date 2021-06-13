import {Injectable} from '@angular/core';

@Injectable()
export class CampPrizeLimitEnum {
  values: string[][] = [
    ["CAMP_ALL_LIMIT", "全员通用"],
    ["CAMP_COMMON_LIMIT", "普通会员专享"],
    ["CAMP_GOLDEN_LIMIT", "黄金会员专享"]
  ];
}
