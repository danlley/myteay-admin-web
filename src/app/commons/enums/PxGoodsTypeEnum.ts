import {Injectable} from '@angular/core';

@Injectable()
export class PxGoodsTypeEnum {
  values: string[][] = [
    ["PX_GOODS_TC", "套餐"],
    ["PX_GOODS_DP", "单品"],
    ["PX_GOODS_JJG", "加价购"],
    ["PX_GOODS_LYH", "零元换"],
    ["PX_GOODS_RT_ZC", "披萨"],
    ["PX_GOODS_NC", "奶茶"],
    ["PX_GOODS_CY", "茶饮"],
    ["PX_GOODS_PS", "配餐"],
    ["PX_GOODS_BQL", "炸鸡"]
  ];
}
