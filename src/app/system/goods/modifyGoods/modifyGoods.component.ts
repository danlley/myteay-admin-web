import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-modify-goods',
    templateUrl: './modifyGoods.component.html',
    styleUrls: ['./modifyGoods.component.css']
})
export class ModifyGoodsComponent implements OnInit {
    title = '修改商品摘要!';
    ftConfitService: FatigeConfigService;
    formData = new PxGoodsConfigModel();

    shopData;
    summaryTableElement: any[];

    orderType;
    isHuiyuan;
    isQuan;
    isTuan;

    goodsId;
    data;

    constructor(ftConfitService: FatigeConfigService, private datePipe: DatePipe,
                private eventBus: EventService, private activeRoute: ActivatedRoute) {
        this.ftConfitService = ftConfitService;
    }

    ngOnInit(): void {
        console.log(this.title);
        this.initContactList();
        this.initShopData();
        this.initSingleGoods();
    }

    goReturn() {
        this.eventBus.publish('system_goods_manage_all', this.shopData);
    }

    private initSingleGoods() {
        this.formData.goodsId = this.goodsId;
        this.formData.operationType = 'PX_QUERY_ONE';
        console.log('----------------------------------->', this.formData);
        this.ftConfitService.manageGoodsConfig(this.formData).subscribe(res => {
            this.data = this.filterResult(res.json());
            this.formData.operationType = 'PX_MODIFY';
            this.formData.goodsId = this.data.goodsId;
            this.formData.goodsImage = this.data.goodsImage;
            this.formData.isHuiyuan = this.data.isHuiyuan;
            this.formData.isQuan = this.data.isQuan;
            this.formData.isTuan = this.data.isTuan;
            this.formData.gmtExpired = this.datePipe.transform(this.data.gmtExpired, 'yyyy-MM-dd HH:mm:ss');
            this.formData.goodsOnlineTime = this.data.goodsOnlineTime;
            this.formData.orderType = this.data.orderType;
            this.formData.goodsCommPrice = this.data.goodsCommPrice;
            this.formData.goodsPrice = this.data.goodsPrice;
            this.formData.goodsDesc = this.data.goodsDesc;
            this.formData.goodsTitle = this.data.goodsTitle;
            this.formData.gmtCreated = this.data.gmtCreated;
            this.formData.gmtModified = this.data.gmtModified;
            this.formData.goodsSellAmount = this.data.goodsSellAmount;
            this.formData.shopId = this.data.shopId;

            console.log('=======================>', res.json());
        });
    }

    modifyGoodsConfig() {
        console.log('----------------------------------->', this.formData);
        this.ftConfitService.manageGoodsConfig(this.formData).subscribe(res => {
            console.log('=======================>', res.json());
            this.eventBus.publish('system_goods_manage_all', this.shopData);
        });
    }

    private initShopData() {
        const tmpData: string = this.activeRoute.snapshot.queryParams['data'];
        this.goodsId = this.activeRoute.snapshot.queryParams['id'];
        const tmpArr: string[] = tmpData.split(',');
        this.shopData = tmpArr;
        console.log('=====--------->', this.shopData);

        this.constructSummaryTableData();
    }

    private constructSummaryTableData() {
        const id: PxSummaryTableElement = new PxSummaryTableElement();
        id.face = '店铺ID';
        id.value = this.shopData[0];

        const name: PxSummaryTableElement = new PxSummaryTableElement();
        name.face = '店铺名称';
        name.value = this.shopData[1];

        const owner: PxSummaryTableElement = new PxSummaryTableElement();
        owner.face = '店主';
        owner.value = this.shopData[2];

        const status: PxSummaryTableElement = new PxSummaryTableElement();
        status.face = '店铺状态';
        status.value = this.shopData[3];

        const expired: PxSummaryTableElement = new PxSummaryTableElement();
        expired.face = '过期时间';
        expired.value = this.shopData[5];

        const address: PxSummaryTableElement = new PxSummaryTableElement();
        address.face = '店铺地址';
        address.value = this.shopData[4];
        this.summaryTableElement = [[id, name, owner], [status, expired, address]];
    }

    initContactList() {
        this.ftConfitService.getDataDictionaryByKey('PxGoodsOrderTypeEnum').subscribe(res => {
            this.orderType = this.filterResult(res.json());
        });
        this.ftConfitService.getDataDictionaryByKey('PxGoodsHuiyuanEnum').subscribe(res => {
            this.isHuiyuan = this.filterResult(res.json());
        });
        this.ftConfitService.getDataDictionaryByKey('PxGoodsQuanEnum').subscribe(res => {
            this.isQuan = this.filterResult(res.json());
        });
        this.ftConfitService.getDataDictionaryByKey('PxGoodsTuanEnum').subscribe(res => {
            this.isTuan = this.filterResult(res.json());
        });
    }

    filterResult(data): any {
        console.log('开始过滤处理结果：', data);

        if ('CAMP_OPERATE_SUCCESS' !== data.operateResult) {
            console.log('返回结果失败：', data);
            return null;
        }
        return data.result;
    }
}

export class PxSummaryTableElement {
    face: string;
    value: string;
}

export class PxGoodsConfigModel {
    goodsId: number;
    operationType = 'PX_MODIFY';
    shopId: number;
    goodsImage: string;
    goodsTitle: string;
    goodsDesc: string;
    goodsPrice: string;
    goodsCommPrice: string;
    goodsOnlineTime: string;
    orderType: string;
    isHuiyuan: string;
    isQuan: string;
    isTuan: string;
    goodsSellAmount: string;
    gmtExpired: string;
    gmtCreated: string;
    gmtModified: string;
}
