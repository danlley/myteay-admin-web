import {Injectable} from '@angular/core';

@Injectable()
export class CommonServie {

    public initShopData(urlQueryData: string): string[] {
        return  urlQueryData.split(',');
    }

    public filterResult(data): any {
        if ('CAMP_OPERATE_SUCCESS' !== data.operateResult) {
            return null;
        }
        return data.result;
    }
}