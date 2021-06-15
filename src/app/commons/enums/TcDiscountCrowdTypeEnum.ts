import {Injectable} from '@angular/core';

@Injectable()
export class TcDiscountCrowdTypeEnum {
  values: string[][] = [
    ["PX_SUPPORT_HUIYUAN", "限会员"],
    ["PX_UNSUPPORT_HUIYUAN", "非会员"]
  ];
}
