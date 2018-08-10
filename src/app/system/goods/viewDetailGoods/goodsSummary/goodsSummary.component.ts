import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {environment} from '../../../../../environments/environment.prod';
import {PxGoodsConfigModel} from '../../../../model/goods';
import {CommonServie} from '../../../../utils/common.servie';

@Component({
    selector: 'app-view-detail-goods-summary',
    templateUrl: './goodsSummary.component.html',
    styleUrls: ['./goodsSummary.component.css']
})

/**
 * 商品摘要展示组件
 */
export class GoodsSummaryComponent implements OnInit {
    title = '商品摘要详情!';

    @Input() formData = new PxGoodsConfigModel();

    data;
    goodsConfigModel = new PxGoodsConfigModel();
    image;

    /**
     * 构建组件
     *
     * @param {FatigeConfigService} ftConfitService
     * @param {CommonServie} commonService
     * @param {DatePipe} datePipe
     */
    constructor(private ftConfitService: FatigeConfigService, private commonService: CommonServie, private datePipe: DatePipe) {
    }

    /**
     * 初始化组件
     */
    ngOnInit(): void {
        console.log(this.title);
        this.initSingleGoods();

        // 商品摘要图片预览地址
        this.image = environment.PKG_IMG_SHOW_URL + this.formData.goodsImage;
    }

    /**
     * 查询当前商品摘要信息
     */
    private initSingleGoods() {
        const formData: FormData = new FormData();
        formData.append('goodsId', this.formData.goodsId);
        formData.append('operationType', 'PX_QUERY_ONE');
        console.log('--formData--------------------------------->', this.formData.goodsId);
        console.log('--formData--------------------------------->', this.formData.goodsId);
        this.ftConfitService.manageGoodsConfig(formData).subscribe(res => {
            this.data = this.commonService.filterResult(res.json());
            this.ftConfitService.getDataDictionaryByKey('PxGoodsOrderTypeEnum').subscribe(res1 => {
                const orderType = this.commonService.filterResult(res1.json());
                if (orderType !== null) {
                    orderType.forEach(e => {
                        if (e.bizKey === this.goodsConfigModel.orderType) {
                            this.goodsConfigModel.orderTypeShow = e.value;
                        }
                    });
                }
            });
            this.ftConfitService.getDataDictionaryByKey('PxGoodsHuiyuanEnum').subscribe(res2 => {
                const isHuiyuan = this.commonService.filterResult(res2.json());
                if (isHuiyuan !== null) {
                    isHuiyuan.forEach(e => {
                        if (e.bizKey === this.goodsConfigModel.isHuiyuan) {
                            this.goodsConfigModel.isHuiyuanShow = e.value;
                        }
                    });
                }
            });
            this.ftConfitService.getDataDictionaryByKey('PxGoodsQuanEnum').subscribe(res3 => {
                const isQuan = this.commonService.filterResult(res3.json());
                console.log('isQuan：', isQuan);
                if (isQuan !== null) {
                    isQuan.forEach(e => {
                        if (e.bizKey === this.goodsConfigModel.isQuan) {
                            this.goodsConfigModel.isQuanShow = e.value;
                        }
                    });
                }
            });
            this.ftConfitService.getDataDictionaryByKey('PxGoodsTuanEnum').subscribe(res4 => {
                const isTuan = this.commonService.filterResult(res4.json());
                if (isTuan !== null) {
                    isTuan.forEach(e => {
                        if (e.bizKey === this.goodsConfigModel.isTuan) {
                            this.goodsConfigModel.isTuanShow = e.value;
                        }
                    });
                }
            });
            this.goodsConfigModel.goodsStatus = this.data.goodsStatus;
            this.ftConfitService.getDataDictionaryByKey('PxGoodsStatusEnum').subscribe(res4 => {
                const goodsStatusList = this.commonService.filterResult(res4.json());
                console.log('==goodsStatusList---------------'+this.goodsConfigModel.goodsStatus+'==>', goodsStatusList);
                if (goodsStatusList !== null) {
                    goodsStatusList.forEach(e => {
                        if (e.bizKey === this.goodsConfigModel.goodsStatus) {
                            this.goodsConfigModel.goodsStatusShow = e.value;
                        }
                    });
                }
            });
            this.goodsConfigModel.goodsId = this.data.goodsId;
            this.goodsConfigModel.goodsImage = this.data.goodsImage;
            this.goodsConfigModel.goodsImageShow = environment.PKG_IMG_SHOW_URL + this.data.goodsImage;
            this.goodsConfigModel.isHuiyuan = this.data.isHuiyuan;
            this.goodsConfigModel.isQuan = this.data.isQuan;
            this.goodsConfigModel.isTuan = this.data.isTuan;
            this.goodsConfigModel.gmtExpired = this.datePipe.transform(this.data.gmtExpired, 'yyyy-MM-dd HH:mm:ss');
            this.goodsConfigModel.goodsOnlineTime = this.data.goodsOnlineTime;
            this.goodsConfigModel.orderType = this.data.orderType;
            this.goodsConfigModel.goodsCommPrice = this.data.goodsCommPrice;
            this.goodsConfigModel.goodsPrice = this.data.goodsPrice;
            this.goodsConfigModel.goodsDesc = this.data.goodsDesc;
            this.goodsConfigModel.goodsTitle = this.data.goodsTitle;
            this.goodsConfigModel.gmtCreated = this.datePipe.transform(this.data.gmtCreated, 'yyyy-MM-dd HH:mm:ss');
            this.goodsConfigModel.gmtModified = this.datePipe.transform(this.data.gmtModified, 'yyyy-MM-dd HH:mm:ss');
            this.goodsConfigModel.goodsSellAmount = this.data.goodsSellAmount;
            this.goodsConfigModel.shopId = this.data.shopId;
            console.log('==goodsConfigModel---------------==>', this.goodsConfigModel);
        });
    }
}
