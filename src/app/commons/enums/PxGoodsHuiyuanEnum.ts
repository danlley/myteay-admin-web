import {Injectable} from '@angular/core';

@Injectable()
export class PxGoodsHuiyuanEnum {
  values: string[][] = [
    ["PX_SUPPORT_HUIYUAN", "仅支持会员"],
    ["PX_UNSUPPORT_HUIYUAN", "全员通用"]
  ];
}
