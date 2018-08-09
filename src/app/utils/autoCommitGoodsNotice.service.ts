import {Injectable} from '@angular/core';
import {PxPackageNoticeModel, PxPackageSubNoticeModel} from '../model/goods';

@Injectable()
export class AutoCommitGoodsNoticeService {

    public getGoodsPackagesNoticeList(goodsId: string): PxPackageNoticeModel[] {
        const goodsPackagesNoticeList: PxPackageNoticeModel[] = [];

        const packagesNotice1 = new PxPackageNoticeModel();
        packagesNotice1.goodsId = goodsId;
        packagesNotice1.packagesNoticeName = '有效期';
        packagesNotice1.operationType = 'PX_ADD';
        const goodsPackagesSubNoticeList1 = this.initSubNoticeList1();
        packagesNotice1.goodsPackagesSubNoticeList = goodsPackagesSubNoticeList1;
        goodsPackagesNoticeList.push(packagesNotice1);

        const packagesNotice2 = new PxPackageNoticeModel();
        packagesNotice2.goodsId = goodsId;
        packagesNotice2.packagesNoticeName = '使用时间';
        packagesNotice2.operationType = 'PX_ADD';
        const goodsPackagesSubNoticeList2 = this.initSubNoticeList2();
        packagesNotice2.goodsPackagesSubNoticeList = goodsPackagesSubNoticeList2;
        goodsPackagesNoticeList.push(packagesNotice2);

        const packagesNotice3 = new PxPackageNoticeModel();
        packagesNotice3.goodsId = goodsId;
        packagesNotice3.packagesNoticeName = '使用规则';
        packagesNotice3.operationType = 'PX_ADD';
        const goodsPackagesSubNoticeList3 = this.initSubNoticeList3();
        packagesNotice3.goodsPackagesSubNoticeList = goodsPackagesSubNoticeList3;
        goodsPackagesNoticeList.push(packagesNotice3);

        return goodsPackagesNoticeList;
    }

    private initSubNoticeList3(): PxPackageSubNoticeModel[] {
        let goodsPackagesSubNoticeList: PxPackageSubNoticeModel[] = [];

        const subNotice1 = this.getSingleGoodsPackagesSubNotice('无需预约，消费高峰时可能需要等位');
        goodsPackagesSubNoticeList = this.getGoodsPackagesSubNoticeList(subNotice1, goodsPackagesSubNoticeList);

        const subNotice2 = this.getSingleGoodsPackagesSubNotice('每单限最多使用一张优惠券');
        goodsPackagesSubNoticeList = this.getGoodsPackagesSubNoticeList(subNotice2, goodsPackagesSubNoticeList);

        const subNotice3 = this.getSingleGoodsPackagesSubNotice('餐巾纸费: 本套餐已含餐巾纸');
        goodsPackagesSubNoticeList = this.getGoodsPackagesSubNoticeList(subNotice3, goodsPackagesSubNoticeList);

        const subNotice4 = this.getSingleGoodsPackagesSubNotice('仅限堂食，不提供餐前外带，餐毕未吃完可打包，打包费详情咨询商家');
        goodsPackagesSubNoticeList = this.getGoodsPackagesSubNoticeList(subNotice4, goodsPackagesSubNoticeList);

        const subNotice5 = this.getSingleGoodsPackagesSubNotice('团购用户不可享受商家其他优惠');
        goodsPackagesSubNoticeList = this.getGoodsPackagesSubNoticeList(subNotice5, goodsPackagesSubNoticeList);

        const subNotice6 = this.getSingleGoodsPackagesSubNotice('酒水饮料等问题，请致电商家咨询，以商家反馈为准');
        goodsPackagesSubNoticeList = this.getGoodsPackagesSubNoticeList(subNotice6, goodsPackagesSubNoticeList);

        const subNotice7 = this.getSingleGoodsPackagesSubNotice('因部分菜品因时令或其他不可抗因素导致无法提供，店内会用等价菜品替换，具体事宜请与店内协商');
        goodsPackagesSubNoticeList = this.getGoodsPackagesSubNoticeList(subNotice7, goodsPackagesSubNoticeList);

        const subNotice8 = this.getSingleGoodsPackagesSubNotice('提供免费wifi');
        goodsPackagesSubNoticeList = this.getGoodsPackagesSubNoticeList(subNotice8, goodsPackagesSubNoticeList);

        const subNotice9 = this.getSingleGoodsPackagesSubNotice('停车位等事宜请咨询商家');
        goodsPackagesSubNoticeList = this.getGoodsPackagesSubNoticeList(subNotice9, goodsPackagesSubNoticeList);

        return goodsPackagesSubNoticeList;
    }

    private initSubNoticeList2(): PxPackageSubNoticeModel[] {
        let goodsPackagesSubNoticeList: PxPackageSubNoticeModel[] = [];

        const subNotice = this.getSingleGoodsPackagesSubNotice('早上8:00~晚上21:00');
        goodsPackagesSubNoticeList = this.getGoodsPackagesSubNoticeList(subNotice, goodsPackagesSubNoticeList);

        return goodsPackagesSubNoticeList;
    }

    private initSubNoticeList1(): PxPackageSubNoticeModel[] {
        let goodsPackagesSubNoticeList: PxPackageSubNoticeModel[] = [];

        const subNotice = this.getSingleGoodsPackagesSubNotice('2018.8.8 至 2019.9.9（周末、法定节假日通用）');
        goodsPackagesSubNoticeList = this.getGoodsPackagesSubNoticeList(subNotice, goodsPackagesSubNoticeList);

        return goodsPackagesSubNoticeList;
    }

    private getGoodsPackagesSubNoticeList(subNotice: PxPackageSubNoticeModel,
                                          goodsPackagesSubNoticeList: PxPackageSubNoticeModel[]): PxPackageSubNoticeModel[] {
        goodsPackagesSubNoticeList.push(subNotice);
        return goodsPackagesSubNoticeList;
    }

    private getSingleGoodsPackagesSubNotice(subNoticeDetail: string): PxPackageSubNoticeModel {

        const goodsPackagesSubNotice = new PxPackageSubNoticeModel();
        goodsPackagesSubNotice.operationType = 'PX_ADD';
        goodsPackagesSubNotice.subNoticeDetail = subNoticeDetail;

        return goodsPackagesSubNotice;
    }
}
