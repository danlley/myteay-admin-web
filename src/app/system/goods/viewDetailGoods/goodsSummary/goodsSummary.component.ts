import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../../asyncService/asyncService.service';

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

    constructor(ftConfitService: FatigeConfigService, private datePipe: DatePipe,
                private eventBus: EventService, private activeRoute: ActivatedRoute) {
        this.ftConfitService = ftConfitService;
    }

    ngOnInit(): void {
        console.log(this.title);
        this.initKeyList();
    }

    initKeyList() {
        this.ftConfitService.getDataDictionaryByKey('PxGoodsOrderTypeEnum').subscribe(res => {
            const orderType = this.filterResult(res.json());
            if (orderType !== null) {
                orderType.forEach(e => {
                    if (e.bizKey === this.formData.orderType) {
                        this.orderTypeShow = e.value;
                    }
                });
            }
        });
        this.ftConfitService.getDataDictionaryByKey('PxGoodsHuiyuanEnum').subscribe(res => {
            const isHuiyuan = this.filterResult(res.json());
            if (isHuiyuan !== null) {
                isHuiyuan.forEach(e => {
                    if (e.bizKey === this.formData.isHuiyuan) {
                        this.isHuiyuanShow = e.value;
                    }
                });
            }
        });
        this.ftConfitService.getDataDictionaryByKey('PxGoodsQuanEnum').subscribe(res => {
            const isQuan = this.filterResult(res.json());
            console.log('isQuan：', isQuan);
            if (isQuan !== null) {
                isQuan.forEach(e => {
                    if (e.bizKey === this.formData.isQuan) {
                        this.isQuanShow = e.value;
                    }
                });
            }
        });
        this.ftConfitService.getDataDictionaryByKey('PxGoodsTuanEnum').subscribe(res => {
            const isTuan = this.filterResult(res.json());
            if (isTuan !== null) {
                isTuan.forEach(e => {
                    if (e.bizKey === this.formData.isTuan) {
                        this.isTuanShow = e.value;
                    }
                });
            }
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
