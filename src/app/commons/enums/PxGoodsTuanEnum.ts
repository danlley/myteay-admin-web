import {Injectable} from '@angular/core';

@Injectable()
export class PxGoodsTuanEnum {
  values: string[][] = [
    ["PX_HAS_TUAN", "支持团购"],
    ["PX_UNHAS_TUAN", "不支持团购"]
  ];
}
