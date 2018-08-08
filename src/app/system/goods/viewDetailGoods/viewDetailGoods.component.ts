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

/**
 * 商品详情展示组件
 */
export class ViewDetailGoodsComponent implements OnInit {
    title = '商品详情展示组件';

    formData = new PxGoodsConfigModel();

    shopData;
    goodsId;

    /**
     * 构建组件
     *
     * @param {FatigeConfigService} ftConfitService
     * @param {DatePipe} datePipe
     * @param {CommonServie} commonService
     * @param {EventService} eventBus
     * @param {ActivatedRoute} activeRoute
     */
    constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe, private commonService: CommonServie,
                private eventBus: EventService, private activeRoute: ActivatedRoute) {
    }

    /**
     * 初始化组件
     */
    ngOnInit(): void {
        console.log(this.title);
        this.initShopData();
        this.initSingleGoods();
    }

    /**
     * 获取当前商品信息
     */
    private initSingleGoods() {
        this.formData.goodsId = this.goodsId;
        this.formData.operationType = 'PX_QUERY_ONE';
        this.ftConfitService.manageGoodsConfig(this.formData).subscribe(res => {
            const data = this.commonService.filterResult(res.json());
            this.formData.goodsId = data.goodsId;
            this.formData.goodsImage = data.goodsImage;
            this.formData.isHuiyuan = data.isHuiyuan;
            this.formData.isQuan = data.isQuan;
            this.formData.isTuan = data.isTuan;
            this.formData.gmtExpired = this.datePipe.transform(data.gmtExpired, 'yyyy-MM-dd HH:mm:ss');
            this.formData.goodsOnlineTime = data.goodsOnlineTime;
            this.formData.orderType = data.orderType;
            this.formData.goodsCommPrice = data.goodsCommPrice;
            this.formData.goodsPrice = data.goodsPrice;
            this.formData.goodsDesc = data.goodsDesc;
            this.formData.goodsTitle = data.goodsTitle;
            this.formData.gmtCreated = this.datePipe.transform(data.gmtCreated, 'yyyy-MM-dd HH:mm:ss');
            this.formData.gmtModified = this.datePipe.transform(data.gmtModified, 'yyyy-MM-dd HH:mm:ss');
            this.formData.goodsSellAmount = data.goodsSellAmount;
            this.formData.shopId = data.shopId;

            console.log('=======================>', res.json());
        });
    }

    /**
     * 返回商品管理列表页面
     */
    goReturn() {
        this.eventBus.publish('system_goods_manage_all', this.shopData);
    }

    /**
     * 初始化当前商品所在店铺数据
     */
    private initShopData() {
        this.goodsId = this.activeRoute.snapshot.queryParams['id'];
        this.shopData = this.commonService.initShopData(this.activeRoute.snapshot.queryParams['data']);
        console.log('=====--------->', this.shopData);
    }

}
