export class PxGoodsConfigModel {
    goodsId: number;
    operationType = 'PX_DELETE';
    shopId: number;
    goodsImage: string;
    goodsStatus: string;
    goodsStatusShow: string;
    goodsTitle: string;
    goodsDesc: string;
    goodsPrice: string;
    goodsCommPrice: string;
    goodsOnlineTime: string;
    orderType: string;
    goodsType: string;
    isHuiyuan: string;
    isQuan: string;
    isTuan: string;
    orderTypeShow: string;
    goodsImageShow: string;
    isHuiyuanShow: string;
    isQuanShow: string;
    isTuanShow: string;
    goodsSellAmount: string;
    gmtExpired: string;
    gmtCreated: string;
    gmtModified: string;
}

export class PxPackageSubNoticeModel {
    packagesNoticeId: string;
    operationType = 'PX_ADD';
    packagesSuNoticeId: string;
    subNoticeDetail: string;
    gmtCreated: string;
    gmtModified: string;
}

export class PxPackageNoticeModel {
    packagesNoticeId: string;
    operationType = 'PX_ADD';
    goodsId: string;
    packagesNoticeName: string;
    gmtCreated: string;
    gmtModified: string;
    goodsPackagesSubNoticeList: PxPackageSubNoticeModel[];
}


export class PxSubPackagesModel {
    subPackagesId: string;
    packagesDetailId: string;
    subPackagesName: string;
    subPackagesAmount: string;
    subPackagesType: string;
    subPackagePrice: string;
    operationType = 'PX_ADD';
    gmtCreated: string;
    gmtModified: string;
}

export class PxPackageDetailModel {
    packagesDetailId: string;
    operationType = 'PX_ADD';
    goodsId: number;
    packageDetailName: string;
    gmtCreated: string;
    gmtModified: string;
    height: string;
    tableElement = {
        'tableHeaders': [],
        'tableOp': [],
        'tableContent': []
    };
}

export class PxPackageImageModel {
    imageId;
    goodsId;
    image;
    imageShow;
    gmtCreated;
    gmtModified;
}
