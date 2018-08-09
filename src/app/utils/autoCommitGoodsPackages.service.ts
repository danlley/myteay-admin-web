import {Injectable} from '@angular/core';
import {PxPackageDetailModel} from '../model/goods';

@Injectable()
export class AutoCommitGoodsPackagesService {

    public getPxPackageDetailModelList(goodsId): PxPackageDetailModel[] {
        const pxPackageDetailModelList: PxPackageDetailModel[] = [];

        const packagesDetail1 = this.getSinglePxPackageDetailModel(goodsId, '特色菜');
        pxPackageDetailModelList.push(packagesDetail1);

        const packagesDetail2 = this.getSinglePxPackageDetailModel(goodsId, '配菜2选1');
        pxPackageDetailModelList.push(packagesDetail2);

        const packagesDetail3 = this.getSinglePxPackageDetailModel(goodsId, '饮料2选1');
        pxPackageDetailModelList.push(packagesDetail3);

        const packagesDetail4 = this.getSinglePxPackageDetailModel(goodsId, '其他');
        pxPackageDetailModelList.push(packagesDetail4);

        return pxPackageDetailModelList;
    }

    public getSinglePxPackageDetailModel(goodsId, goodsPackagesDetailName): PxPackageDetailModel {
        const packagesDetail = new PxPackageDetailModel();
        packagesDetail.goodsId = goodsId;
        packagesDetail.packageDetailName = goodsPackagesDetailName;
        packagesDetail.operationType = 'PX_ADD';

        return packagesDetail;
    }
}