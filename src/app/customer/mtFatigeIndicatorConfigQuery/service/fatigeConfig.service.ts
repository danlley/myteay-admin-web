import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {environment} from '../../../../environments/environment.prod';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FatigeConfigService {

    constructor(private _http: Http) {
    }

    private getHeaderOptions() {
        const headers = new Headers({
            'language-options': 'zh',
        });

        return new RequestOptions({headers: headers});
    }

    private getHeaderMultiOptions() {
        const headers = new Headers({
            'language-options': 'zh',
            'Content-Type': 'multipart/form-data'
        });

        return new RequestOptions({headers: headers});
    }

    getAllFatigeIndicatorConfig(): any {
        return this._http.get(environment.FATIGE_CONFIG_URL + '', this.getHeaderOptions());
    }

    getAllShopConfig(): any {
        return this._http.get(environment.SYSTEM_QUERY_CONFIG_URL + '', this.getHeaderOptions());
    }

    getAllProductsConfig(shopId: string): any {
        return this._http.get(environment.SYSTEM_PROVIDER_PRODUCT_CONFIG_URL + shopId, this.getHeaderOptions());
    }

    getAllDiscountGoodsConfig(shopId: string): any {
        return this._http.get(environment.SYSTEM_DISCOUNT_GOODS_CONFIG_URL + shopId, this.getHeaderOptions());
    }

    manageProductPriceConfig(data): any {
        return this._http.post(environment.PROVIDER_PRODUCT_PRICE_URL , data, this.getHeaderOptions());
    }

    queryProductPriceConfigAll(productId): any {
        return this._http.get(environment.PROVIDER_PRODUCT_PRICE_QRY_URL + productId, this.getHeaderOptions());
    }

    getShopAllCampBaseConfig(shopId: string): any {
        return this._http.get(environment.CAMP_BASE_QUERY_CONFIG_URL  + '/' + shopId, this.getHeaderOptions());
    }

    getShopAllCampPrizeConfig(campId: string): any {
        return this._http.get(environment.CAMP_PRIZE_QUERY_CONFIG_URL  + '/' + campId, this.getHeaderOptions());
    }

    manageShopCampPrizeRefGoodsListConfig(prizeId, data): any {
        return this._http.post(environment.CAMP_PRIZE_GOODS_REF_MNG_CONFIG_URL  + '/' + prizeId , data, this.getHeaderOptions());
    }

    getShopCampPrizeRefGoodsListConfig(prizeId: string): any {
        return this._http.get(environment.CAMP_PRIZE_GOODS_REF_QUERY_CONFIG_URL  + '/' + prizeId, this.getHeaderOptions());
    }


    getSingleShopPrizeGoodsConfig(data): any {
        return this._http.post(environment.SYSTEM_CAMP_PRIZE_REF_GOODS_MNG_CONFIG_URL, data, this.getHeaderOptions());
    }

    manageCampBaseConfig(data): any {
        return this._http.post(environment.SYSTEM_CAMP_BASE_MNG_CONFIG_URL, data, this.getHeaderOptions());
    }

    manageCampPrizeConfig(data): any {
        return this._http.post(environment.SYSTEM_CAMP_PRIZE_MNG_CONFIG_URL, data, this.getHeaderOptions());
    }

    addProviderProduct(data): any {
        console.log('product------------------------->', data);
        return this._http.post(environment.SYSTEM_PROVIDER_PRODUCT_MNG_CONFIG_URL, data, this.getHeaderOptions());
    }

    manageShopConfig(data): any {
        return this._http.post(environment.SYSTEM_SHOP_MNG_CONFIG_URL, data, this.getHeaderOptions());
    }

    getAllGoodsCostConfig(shopId): any {
        return this._http.get(environment.GOODS_COST_CFG_QUERY_CONFIG_URL + '/' + shopId, this.getHeaderOptions());
    }

    manageGoodsCostConfig(data): any {
        return this._http.post(environment.GOODS_COST_CFG_MNG_CONFIG_URL, data, this.getHeaderOptions());
    }

    getAllGoodsByShopId(shopId: string): any {
        return this._http.get(environment.GOODS_QUERY_SHOP_URL + '/' + shopId, this.getHeaderOptions());
    }

    getAllPackagesImageByGoodsId(shopId: string): any {
        return this._http.get(environment.PKG_IMG_QUERY_GOODS_URL + shopId, this.getHeaderOptions());
    }

    managePackagesImage(file, goodsId): any {
        return this._http.post(environment.PKG_IMG_CONFIG_URL + goodsId , file, this.getHeaderOptions());
    }

    removePackagesImage(imageId): any {
        return this._http.post(environment.PKG_IMG_REMOVE_URL + imageId , this.getHeaderOptions());
    }

    getAllPacakgesDetailByGoodsId(goodsId: string): any {
        return this._http.get(environment.GOODS_QUERY_PACKAGES_URL + '/' + goodsId, this.getHeaderOptions());
    }

    getAllPacakgesNoticeByGoodsId(goodsId: string): any {
        return this._http.get(environment.GOODS_QUERY_PACKAGES_NOTICE_URL + '/' + goodsId, this.getHeaderOptions());
    }

    managePackagesNotice(data): any {
        return this._http.post(environment.GOODS_MNG_PACKAGES_NOTICE_URL, data, this.getHeaderOptions());
    }

    getPackagesSubNotice(subPackagesNoticeId): any {
        return this._http.get(environment.GOODS_QUERY_PACKAGES_SUB_NOTICE_URL + '/' + subPackagesNoticeId, this.getHeaderOptions());
    }

    managePackagesSubNotice(data): any {
        return this._http.post(environment.GOODS_MNG_PACKAGES_SUB_NOTICE_URL, data, this.getHeaderOptions());
    }

    managePackagesDetail(data): any {
        return this._http.post(environment.PKG_MNG_CONFIG_URL, data, this.getHeaderOptions());
    }

    manageSubPackages(data): any {
        return this._http.post(environment.PKG_SUB_MNG_CONFIG_URL, data, this.getHeaderOptions());
    }

    getAllSubPacakgesByGoodsId(subPackagesId: string): any {
        return this._http.get(environment.GOODS_QUERY_SUB_PACKAGES_URL + '/' + subPackagesId, this.getHeaderOptions());
    }

    manageGoodsConfig(data): any {
        return this._http.post(environment.GOODS_MNG_CONFIG_URL, data, this.getHeaderOptions());
    }

    manageGoodsStatus(data): any {
        return this._http.post(environment.GOODS_MNG_GOODS_STATUS_URL, data, this.getHeaderOptions());
    }

    getDataDictionaryByKey(key): any {
        return this._http.get(environment.DATA_DIC_URL + key, this.getHeaderOptions());
    }

    getMessageDataDictionaryByKey(key): any {
        return this._http.get(environment.MESSAGE_DATA_DIC_URL + key, this.getHeaderOptions());
    }

    queryAllMessageConfigByParam(data): any {
        return this._http.post(environment.MESSAGE_CONFIG_QUERY_ALL_URL, data, this.getHeaderOptions());
    }

    querySingleMessageConfigByParam(data): any {
        return this._http.get(environment.MESSAGE_CONFIG_QUERY_SINGLE_URL + data, this.getHeaderOptions());
    }

    manageMessageConfigByParam(data): any {
        return this._http.post(environment.MESSAGE_CONFIG_URL, data, this.getHeaderOptions());
    }
}
