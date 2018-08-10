import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {PxGoodsConfigModel} from '../../../model/goods';
import {CommonServie} from '../../../utils/common.servie';

@Component({
    selector: 'app-view-detail-goods-active',
    templateUrl: './activeGoods.component.html',
    styleUrls: ['./activeGoods.component.css']
})

/**
 * 商品发布组件
 */
export class ActiveGoodsComponent implements OnInit {
    title = '商品发布';

    formData = new PxGoodsConfigModel();

    shopData;
    goodsId;

    // 是否显示发布按钮
    isNeesShowOnlineButton = true;

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
     * 商品发布
     */
    public operateOnline() {
        this.formData.goodsId = this.goodsId;
        this.formData.operationType = 'PX_MODIFY';
        this.formData.goodsStatus = 'PX_GOODS_ONLINE';
        this.ftConfitService.manageGoodsStatus(this.formData).subscribe(res => {
            const data = this.commonService.filterResult(res.json());
            console.log('====data===================>', data);
            this.goReturn();
        });
    }

    /**
     * 获取当前商品信息
     */
    private initSingleGoods() {
        const formData: FormData = new FormData();
        formData.append('goodsId', this.goodsId);
        formData.append('operationType', 'PX_QUERY_ONE');
        this.formData.goodsId = this.goodsId;
        this.ftConfitService.manageGoodsConfig(formData).subscribe(res => {
            const data = this.commonService.filterResult(res.json());
            console.log('====data===================>', data);
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
            this.formData.goodsStatus = data.goodsStatus;
            this.formData.operationType = 'PX_QUERY_ONE';
            if (this.formData.goodsStatus === 'PX_GOODS_ONLINE') {
                this.isNeesShowOnlineButton = false;
            }

            console.log('====formData===================>', this.formData);
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
