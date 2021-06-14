import {Injectable} from '@angular/core';

@Injectable()
export class TcProdtransTypeEnum {
  values: string[][] = [
    ['TC_DAILY', '日账'],
    ['TC_WEEKLY', '周账'],
    ['TC_MONTHLY', '月账'],
    ['TC_YEAR', '年账']
  ];
}
