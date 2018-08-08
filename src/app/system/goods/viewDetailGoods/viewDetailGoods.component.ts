import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {PxGoodsConfigModel} from '../../../model/goods';
import {CommonServie} from '../../../utils/common.servie';

@Component({
    selector: 'app-view-detail-goods',
    templateUrl: './viewDetailGoods.component.html',
    styleUrls: ['./viewDetailGoods.component.css']
})
export class ViewDetailGoodsComponent implements OnInit {
    title = '商品摘要详情!';

    formData = new PxGoodsConfigModel();

    shopData;
    orderType;
    isHuiyuan;
    isQuan;
    isTuan;

    goodsId;
    data;

    constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe, private commonService: CommonServie,
                private eventBus: EventService, private activeRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        console.log(this.title);
        this.initContactList();
        this.initShopData();
        this.initSingleGoods();
    }

    private initSingleGoods() {
        this.formData.goodsId = this.goodsId;
        this.formData.operationType = 'PX_QUERY_ONE';
        console.log('----------------------------------->', this.formData);
        this.ftConfitService.manageGoodsConfig(this.formData).subscribe(res => {
            this.data = this.commonService.filterResult(res.json());
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
            this.formData.gmtCreated = this.datePipe.transform(this.data.gmtCreated, 'yyyy-MM-dd HH:mm:ss');
            this.formData.gmtModified = this.datePipe.transform(this.data.gmtModified, 'yyyy-MM-dd HH:mm:ss');
            this.formData.goodsSellAmount = this.data.goodsSellAmount;
            this.formData.shopId = this.data.shopId;

            console.log('=======================>', res.json());
        });
    }

    goReturn() {
        this.eventBus.publish('system_goods_manage_all', this.shopData);
    }

    private initShopData() {
        this.goodsId = this.activeRoute.snapshot.queryParams['id'];
        this.shopData = this.commonService.initShopData(this.activeRoute.snapshot.queryParams['data']);
        console.log('=====--------->', this.shopData);
    }

    initContactList() {
        this.ftConfitService.getDataDictionaryByKey('PxGoodsOrderTypeEnum').subscribe(res => {
            this.orderType = this.commonService.filterResult(res.json());
        });
        this.ftConfitService.getDataDictionaryByKey('PxGoodsHuiyuanEnum').subscribe(res => {
            this.isHuiyuan = this.commonService.filterResult(res.json());
        });
        this.ftConfitService.getDataDictionaryByKey('PxGoodsQuanEnum').subscribe(res => {
            this.isQuan = this.commonService.filterResult(res.json());
        });
        this.ftConfitService.getDataDictionaryByKey('PxGoodsTuanEnum').subscribe(res => {
            this.isTuan = this.commonService.filterResult(res.json());
        });
    }
}
