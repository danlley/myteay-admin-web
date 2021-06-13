import {Injectable} from '@angular/core';

@Injectable()
export class CampPrizeStatusEnum {
  values: string[][] = [
    ["CAMP_PRIZE_DRAFT", "草稿"],
    ["CAMP_PRIZE_ONLINE", "已上架"],
    ["CAMP_PRIZE_OFFLINE", "已下架"],
    ["CAMP_PRIZE_EXPIRED", "已过期"]
  ];
}
