import {Injectable} from '@angular/core';

@Injectable()
export class CampStatusEnum {
  values: string[][] = [
    ['CAMP_DRAFT', '草稿'],
    ['CAMP_ONLINE', '已启动'],
    ['CAMP_OFFLINE', '已停止'],
    ['CAMP_EXPIRED', '已过期']
  ];
}
