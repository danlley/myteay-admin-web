import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment.prod';

@Injectable()
export class FatigeConfigService {

  constructor(private _http: HttpClient) {

  }

  private getHeaderOptions(): HttpHeaders {
    return new HttpHeaders({
      'language-options': 'zh',
    });
  }

  private getHeaderMultiOptions() {
    return new HttpHeaders({
      'language-options': 'zh',
      'Content-Type': 'multipart/form-data'
    });
  }

  getAllShopConfig(): any {
    return this._http.get(environment.SYSTEM_QUERY_CONFIG_URL + '', {headers: this.getHeaderOptions()});
  }

  getAllProductsConfig(shopId: string): any {
    return this._http.get(environment.SYSTEM_PROVIDER_PRODUCT_CONFIG_URL + shopId, {headers: this.getHeaderOptions()});
  }

  getAllProdtransUsrShopProdConfig(shopId: string): any {
    return this._http.post(environment.SYSTEM_USR_SHOP_PROD_ALL_URL + shopId, null, {headers: this.getHeaderOptions()});
  }

  getAllDiscountGoodsConfig(shopId: string): any {
    return this._http.get(environment.SYSTEM_DISCOUNT_GOODS_CONFIG_URL + shopId, {headers: this.getHeaderOptions()});
  }

  removeDiscountGoodsConfigById(data): any {
    return this._http.post(environment.SYSTEM_DISCOUNT_GOODS_RMV_URL, data, {headers: this.getHeaderOptions()});
  }

  changeDiscountStatus(data): any {
    return this._http.post(environment.SYSTEM_DISCOUNT_GOODS_UPD_URL, data, {headers: this.getHeaderOptions()});
  }

  manageProductPriceConfig(data): any {
    return this._http.post(environment.PROVIDER_PRODUCT_PRICE_URL, data, {headers: this.getHeaderOptions()});
  }

  queryProductPriceConfigAll(productId): any {
    return this._http.get(environment.PROVIDER_PRODUCT_PRICE_QRY_URL + productId, {headers: this.getHeaderOptions()});
  }

  getShopAllCampBaseConfig(shopId: string): any {
    return this._http.get(environment.CAMP_BASE_QUERY_CONFIG_URL + '/' + shopId, {headers: this.getHeaderOptions()});
  }

  getShopAllCampPrizeConfig(campId: string): any {
    return this._http.get(environment.CAMP_PRIZE_QUERY_CONFIG_URL + '/' + campId, {headers: this.getHeaderOptions()});
  }

  manageShopCampPrizeRefGoodsListConfig(prizeId, data): any {
    return this._http.post(environment.CAMP_PRIZE_GOODS_REF_MNG_CONFIG_URL + '/' + prizeId, data, {headers: this.getHeaderOptions()});
  }

  getShopCampPrizeRefGoodsListConfig(prizeId: string): any {
    return this._http.get(environment.CAMP_PRIZE_GOODS_REF_QUERY_CONFIG_URL + '/' + prizeId, {headers: this.getHeaderOptions()});
  }

  getSingleShopPrizeGoodsConfig(data): any {
    return this._http.post(environment.SYSTEM_CAMP_PRIZE_REF_GOODS_MNG_CONFIG_URL, data, {headers: this.getHeaderOptions()});
  }

  manageCampBaseConfig(data): any {
    return this._http.post(environment.SYSTEM_CAMP_BASE_MNG_CONFIG_URL, data, {headers: this.getHeaderOptions()});
  }

  manageShopCampConfig(data): any {
    return this._http.post(environment.SHOP_CONFIG_APPLY_URL, data, {headers: this.getHeaderOptions()});
  }

  manageCampPrizeConfig(data): any {
    return this._http.post(environment.SYSTEM_CAMP_PRIZE_MNG_CONFIG_URL, data, {headers: this.getHeaderOptions()});
  }

  addProviderProduct(data): any {
    console.log('product------------------------->', data);
    return this._http.post(environment.SYSTEM_PROVIDER_PRODUCT_MNG_CONFIG_URL, data, {headers: this.getHeaderOptions()});
  }

  manageShopConfig(data): any {
    return this._http.post(environment.SYSTEM_SHOP_MNG_CONFIG_URL, data, {headers: this.getHeaderOptions()});
  }

  getAllGoodsByShopId(shopId: string): any {
    return this._http.get(environment.GOODS_QUERY_SHOP_URL + '/' + shopId, {headers: this.getHeaderOptions()});
  }

  getAllPackagesImageByGoodsId(shopId: string): any {
    return this._http.get(environment.PKG_IMG_QUERY_GOODS_URL + shopId, {headers: this.getHeaderOptions()});
  }

  managePackagesImage(file, goodsId): any {
    return this._http.post(environment.PKG_IMG_CONFIG_URL + goodsId, file, {headers: this.getHeaderOptions()});
  }

  removePackagesImage(imageId): any {
    return this._http.post(environment.PKG_IMG_REMOVE_URL + imageId, {headers: this.getHeaderOptions()});
  }

  getAllPacakgesDetailByGoodsId(goodsId: string): any {
    return this._http.get(environment.GOODS_QUERY_PACKAGES_URL + '/' + goodsId, {headers: this.getHeaderOptions()});
  }

  getAllPacakgesNoticeByGoodsId(goodsId: string): any {
    return this._http.get(environment.GOODS_QUERY_PACKAGES_NOTICE_URL + '/' + goodsId, {headers: this.getHeaderOptions()});
  }

  managePackagesNotice(data): any {
    return this._http.post(environment.GOODS_MNG_PACKAGES_NOTICE_URL, data, {headers: this.getHeaderOptions()});
  }

  getPackagesSubNotice(subPackagesNoticeId): any {
    return this._http.get(environment.GOODS_QUERY_PACKAGES_SUB_NOTICE_URL + '/' + subPackagesNoticeId, {headers: this.getHeaderOptions()});
  }

  managePackagesSubNotice(data): any {
    return this._http.post(environment.GOODS_MNG_PACKAGES_SUB_NOTICE_URL, data, {headers: this.getHeaderOptions()});
  }

  managePackagesDetail(data): any {
    return this._http.post(environment.PKG_MNG_CONFIG_URL, data, {headers: this.getHeaderOptions()});
  }

  manageSubPackages(data): any {
    return this._http.post(environment.PKG_SUB_MNG_CONFIG_URL, data, {headers: this.getHeaderOptions()});
  }

  getAllSubPacakgesByGoodsId(subPackagesId: string): any {
    return this._http.get(environment.GOODS_QUERY_SUB_PACKAGES_URL + '/' + subPackagesId, {headers: this.getHeaderOptions()});
  }

  manageGoodsConfig(data): any {
    return this._http.post(environment.GOODS_MNG_CONFIG_URL, data, {headers: this.getHeaderOptions()});
  }

  manageGoodsStatus(data): any {
    return this._http.post(environment.GOODS_MNG_GOODS_STATUS_URL, data, {headers: this.getHeaderOptions()});
  }

  addDiscountGoodsConfig(data): any {
    return this._http.post(environment.SYSTEM_DISCOUNT_GOODS_ADD_URL, data, {headers: this.getHeaderOptions()});
  }

  addShopUserProdConfig(data): any {
    return this._http.post(environment.SYSTEM_PDS_SHOP_USR_PROD_ADD_URL, data, {headers: this.getHeaderOptions()});
  }

  removePtsShopUserProdById(shopId: string, prodtransId: string): any {
    return this._http.post(environment.SYSTEM_PDS_SHOP_USR_PROD_RMV_URL + shopId + '/prodtrans/' + prodtransId,
      {headers: this.getHeaderOptions()});
  }

  changePtsShopUserProdStatus(data): any {
    return this._http.post(environment.SYSTEM_PDS_SHOP_USR_PROD_MDF_URL, data, {headers: this.getHeaderOptions()});
  }
}
