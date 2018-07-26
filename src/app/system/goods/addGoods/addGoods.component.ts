import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-add-goods',
    templateUrl: './addGoods.component.html',
    styleUrls: ['./addGoods.component.css']
})
export class AddGoodsComponent implements OnInit {
    title = '添加商品摘要!';
    ftConfitService: FatigeConfigService;
    formData = new PxGoodsConfigModel();

    shopData;
    summaryTableElement: any[];

    orderType;
    isHuiyuan;
    isQuan;
    isTuan;

    constructor(ftConfitService: FatigeConfigService, private eventBus: EventService, private activeRoute: ActivatedRoute) {
        this.ftConfitService = ftConfitService;
    }

    ngOnInit(): void {
        console.log(this.title);
        this.initContactList();
        this.initShopData();
    }

    addNewGoodsConfig() {
        this.formData.shopId = this.shopData[0];
        console.log('----------------------------------->', this.formData);
        this.ftConfitService.manageGoodsConfig(this.formData).subscribe(res => {
            console.log('=======================>', res.json());
            this.eventBus.publish('system_goods_manage_all', this.shopData);
        });
    }

    private initShopData() {
        const tmpData: string = this.activeRoute.snapshot.queryParams['data'];
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
    operationType = 'PX_ADD';
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
