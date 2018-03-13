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
        return this._http.get(environment.FATIGE_CONFIG_URL + '', this.getHeaderOptions());
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
