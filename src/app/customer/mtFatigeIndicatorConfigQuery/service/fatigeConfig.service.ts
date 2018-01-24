import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../../environments/environment.prod';

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

  getAllFatigeIndicatorConfig(): Observable<any[]> {
    return this._http.get(environment.FATIGE_CONFIG_URL + '', this.getHeaderOptions()).map((res: Response) => {
      return res.json();
    });
  }
}
