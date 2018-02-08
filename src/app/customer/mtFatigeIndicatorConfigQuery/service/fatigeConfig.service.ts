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

    getAllFatigeIndicatorConfig(): any {
        console.log('查询疲劳度配置信息请求');
        return this._http.get(environment.FATIGE_CONFIG_URL + '', this.getHeaderOptions());
    }

    getDataDictionaryByKey(key): any {
        console.log('查询数据字典', key);
        return this._http.get(environment.DATA_DIC_URL + key, this.getHeaderOptions());
    }


}
