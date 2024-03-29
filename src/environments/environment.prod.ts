/**
 * GanguTianCan.com Inc.
 * Copyright (c) 2015-2020 All Rights Reserved.
 */
export const environment = {
  production: true,
  // -----------------------------------------               后台管理(已迁移)              ----------------------------------------------------
  PKG_IMG_SHOW_URL: 'http://192.168.1.24:40201/tiancan/api/bmps/web/images/',

  PKG_SUB_MNG_CONFIG_URL: 'http://192.168.1.24:40201/myteay/api/phoenix/admin/manage/sub/pkgs/manage',
  GOODS_QUERY_SUB_PACKAGES_URL: 'http://192.168.1.24:40201/myteay/api/phoenix/admin/manage/sub/pkgs/list/sub/packages/',

  GOODS_QUERY_PACKAGES_SUB_NOTICE_URL: 'http://192.168.1.24:40201/myteay/api/phoenix/admin/manage/pkgs/sub/notice/list/notice/',
  GOODS_MNG_PACKAGES_SUB_NOTICE_URL: 'http://192.168.1.24:40201/myteay/api/phoenix/admin/manage/pkgs/sub/notice/manage',

  GOODS_QUERY_PACKAGES_NOTICE_URL: 'http://192.168.1.24:40201/myteay/api/phoenix/admin/manage/pkgs/notice/list/notice/',
  GOODS_MNG_PACKAGES_NOTICE_URL: 'http://192.168.1.24:40201/myteay/api/phoenix/admin/manage/pkgs/notice/manage',

  PKG_IMG_QUERY_GOODS_URL: 'http://192.168.1.24:40201/myteay/api/phoenix/admin/manage/pkgs/image/list/goods/',
  PKG_IMG_CONFIG_URL: 'http://192.168.1.24:40201/myteay/api/phoenix/admin/manage/pkgs/image/manage/goods/',
  PKG_IMG_REMOVE_URL: 'http://192.168.1.24:40201/myteay/api/phoenix/admin/manage/pkgs/image/manage/goods/remove/',

  GOODS_QUERY_PACKAGES_URL: 'http://192.168.1.24:40201/myteay/api/phoenix/admin/manage/pkgs/list/goods',
  PKG_MNG_CONFIG_URL: 'http://192.168.1.24:40201/myteay/api/phoenix/admin/manage/pkgs/manage',

  GOODS_MNG_GOODS_STATUS_URL: 'http://192.168.1.24:40201/myteay/api/phoenix/admin/manage/goods/status/',
  GOODS_MNG_CONFIG_URL: 'http://192.168.1.24:40201/myteay/api/phoenix/admin/manage/goods/manage',
  SYSTEM_CAMP_PRIZE_REF_GOODS_MNG_CONFIG_URL: 'http://192.168.1.24:40201/myteay/api/phoenix/admin/manage/goods/query/goods/condition/',
  PKG_DETAIL_ADV_URL: 'http://192.168.1.24:40201/myteay/api/phoenix/admin/manage/goods/query/goods/adv/',
  GOODS_QUERY_SHOP_URL: 'http://192.168.1.24:40201/myteay/api/phoenix/admin/manage/goods/list/shop',
  GOODS_QUERY_CONFIG_URL: 'http://192.168.1.24:40201/myteay/api/phoenix/admin/manage/goods/all',

  // -----------------------------------------               店铺核心(已迁移)              ----------------------------------------------------
  SYSTEM_SHOP_MNG_CONFIG_URL: 'http://192.168.1.24:40201/tiancan/api/shop/services/op/manage',
  SYSTEM_QUERY_CONFIG_URL:    'http://192.168.1.24:40201/tiancan/api/shop/services/op/all',
  SHOP_CONFIG_APPLY_URL:      'http://192.168.1.24:40201/tiancan/api/shop/services/op/apply/camp',

  // -----------------------------------------               营销平台(已迁移)              ----------------------------------------------------
  CAMP_BASE_QUERY_CONFIG_URL: 'http://192.168.1.24:40201/myteay/api/phoenix/camp/manage/base/list/shop/',
  SYSTEM_CAMP_BASE_MNG_CONFIG_URL: 'http://192.168.1.24:40201/myteay/api/phoenix/camp/manage/base/manage',
  CAMP_PRIZE_QUERY_CONFIG_URL: 'http://192.168.1.24:40201/myteay/api/phoenix/camp/manage/prize/list/prize/',
  SYSTEM_CAMP_PRIZE_MNG_CONFIG_URL: 'http://192.168.1.24:40201/myteay/api/phoenix/camp/manage/prize/manage',
  CAMP_PRIZE_GOODS_REF_QUERY_CONFIG_URL: 'http://192.168.1.24:40201/myteay/api/phoenix/camp/manage/prize/ref/list',
  CAMP_PRIZE_GOODS_REF_MNG_CONFIG_URL: 'http://192.168.1.24:40201/myteay/api/phoenix/camp/manage/prize/ref/manage',

  // -----------------------------------------               供货商(已迁移)              ----------------------------------------------------
  PROVIDER_PRODUCT_PRICE_URL:             'http://192.168.1.24:40201/tiancan/api/provider/manage/do/price/mng',
  PROVIDER_PRODUCT_PRICE_QRY_URL:         'http://192.168.1.24:40201/tiancan/api/provider/manage/list/price/',
  SYSTEM_PROVIDER_PRODUCT_MNG_CONFIG_URL: 'http://192.168.1.24:40201/tiancan/api/provider/manage/do/mng',
  SYSTEM_PROVIDER_PRODUCT_CONFIG_URL:     'http://192.168.1.24:40201/tiancan/api/provider/manage/list/shop/',

  // -----------------------------------------               折扣系统(已迁移)              ----------------------------------------------------
  SYSTEM_DISCOUNT_GOODS_CONFIG_URL: 'http://192.168.1.24:40201/tiancan/api/discount/manage/query/shop/',
  SYSTEM_DISCOUNT_GOODS_RMV_URL: 'http://192.168.1.24:40201/tiancan/api/discount/manage/opt/del/',
  SYSTEM_DISCOUNT_GOODS_UPD_URL: 'http://192.168.1.24:40201/tiancan/api/discount/manage/opt/modify/',
  SYSTEM_DISCOUNT_GOODS_ADD_URL: 'http://192.168.1.24:40201/tiancan/api/discount/manage/opt/save/',

  // -----------------------------------------               产品账系统(已迁移)              ----------------------------------------------------
  SYSTEM_PDS_SHOP_USR_PROD_ADD_URL: 'http://192.168.1.24:40201/tiancan/api/prodtrans/manage/save/',
  SYSTEM_PDS_SHOP_USR_PROD_RMV_URL: 'http://192.168.1.24:40201/tiancan/api/prodtrans/manage/remove/shop/',
  SYSTEM_PDS_SHOP_USR_PROD_MDF_URL: 'http://192.168.1.24:40201/tiancan/api/prodtrans/manage/modify/',
  SYSTEM_USR_SHOP_PROD_ALL_URL: 'http://192.168.1.24:40201/tiancan/api/prodtrans/manage/query/shop/',
};
