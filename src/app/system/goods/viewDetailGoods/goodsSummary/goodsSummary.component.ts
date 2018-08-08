import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../../asyncService/asyncService.service';
import {environment} from '../../../../../environments/environment.prod';

@Component({
    selector: 'app-view-detail-goods-summary',
    templateUrl: './goodsSummary.component.html',
    styleUrls: ['./goodsSummary.component.css']
})
export class GoodsSummaryComponent implements OnInit {
    title = '商品摘要详情!';

    ftConfitService: FatigeConfigService;
    @Input() formData = new PxGoodsConfigModel();

    private orderTypeShow: any;
    private isHuiyuanShow: any;
    private isQuanShow: any;
    private isTuanShow: any;

    data;

    goodsConfigModel = new PxGoodsConfigModel();

    image;

    constructor(ftConfitService: FatigeConfigService, private datePipe: DatePipe,
                private eventBus: EventService, private activeRoute: ActivatedRoute) {
        this.ftConfitService = ftConfitService;
    }

    ngOnInit(): void {
        console.log(this.title);
        this.initSingleGoods();

        this.image = environment.PKG_IMG_SHOW_URL + this.formData.goodsImage;
    }

    private initSingleGoods() {
        const formData: FormData = new FormData();
        formData.append('goodsId', this.formData.goodsId);
        formData.append('operationType', 'PX_QUERY_ONE');
        console.log('--formData--------------------------------->', this.formData.goodsId);
        console.log('--formData--------------------------------->', this.formData.goodsId);
        this.ftConfitService.manageGoodsConfig(formData).subscribe(res => {
            this.data = this.filterResult(res.json());
            this.ftConfitService.getDataDictionaryByKey('PxGoodsOrderTypeEnum').subscribe(res1 => {
                const orderType = this.filterResult(res1.json());
                if (orderType !== null) {
                    orderType.forEach(e => {
                        if (e.bizKey === this.goodsConfigModel.orderType) {
                            this.goodsConfigModel.orderTypeShow = e.value;
                        }
                    });
                }
            });
            this.ftConfitService.getDataDictionaryByKey('PxGoodsHuiyuanEnum').subscribe(res2 => {
                const isHuiyuan = this.filterResult(res2.json());
                if (isHuiyuan !== null) {
                    isHuiyuan.forEach(e => {
                        if (e.bizKey === this.formData.isHuiyuan) {
                            this.goodsConfigModel.isHuiyuanShow = e.value;
                        }
                    });
                }
            });
            this.ftConfitService.getDataDictionaryByKey('PxGoodsQuanEnum').subscribe(res3 => {
                const isQuan = this.filterResult(res3.json());
                console.log('isQuan：', isQuan);
                if (isQuan !== null) {
                    isQuan.forEach(e => {
                        if (e.bizKey === this.formData.isQuan) {
                            this.goodsConfigModel.isQuanShow = e.value;
                        }
                    });
                }
            });
            this.ftConfitService.getDataDictionaryByKey('PxGoodsTuanEnum').subscribe(res4 => {
                const isTuan = this.filterResult(res4.json());
                if (isTuan !== null) {
                    isTuan.forEach(e => {
                        if (e.bizKey === this.formData.isTuan) {
                            this.goodsConfigModel.isTuanShow = e.value;
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


    filterResult(data): any {
        console.log('开始过滤处理结果：', data);

        if ('CAMP_OPERATE_SUCCESS' !== data.operateResult) {
            console.log('返回结果失败：', data);
            return null;
        }
        return data.result;
    }
}

export class PxGoodsConfigModel {
    goodsId: number;
    operationType = 'PX_MODIFY';
    shopId: number;
    goodsImage: string;
    goodsImageShow: string;
    goodsTitle: string;
    goodsDesc: string;
    goodsPrice: string;
    goodsCommPrice: string;
    goodsOnlineTime: string;
    orderType: string;
    isHuiyuan: string;
    isQuan: string;
    isTuan: string;
    orderTypeShow: string;
    isHuiyuanShow: string;
    isQuanShow: string;
    isTuanShow: string;
    goodsSellAmount: string;
    gmtExpired: string;
    gmtCreated: string;
    gmtModified: string;
}
