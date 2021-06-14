import {Injectable} from '@angular/core';

@Injectable()
export class PxSubPackagesTypeEnum {
  values: string[][] = [
    ["PX_SUB_PKG_BIGGER", "大份"],
    ["PX_SUB_PKG_COMMON", "普通"],
    ["PX_SUB_PKG_SMALL", "小份"]
  ];
}
