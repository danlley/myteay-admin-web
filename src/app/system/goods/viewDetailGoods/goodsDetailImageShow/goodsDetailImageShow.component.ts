import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../../asyncService/asyncService.service';
import {environment} from '../../../../../environments/environment.prod';

@Component({
    selector: 'app-view-detail-goods-image-show',
    templateUrl: './goodsDetailImageShow.component.html',
    styleUrls: ['./goodsDetailImageShow.component.css']
})
export class GoodsDetailImageShowComponent implements OnInit {
    title = '商品摘要详情!';

    ftConfitService: FatigeConfigService;
    templateConfigList = [];
    @Input() formData = new PxGoodsConfigModel();


    constructor(ftConfitService: FatigeConfigService, private datePipe: DatePipe,
                private eventBus: EventService, private activeRoute: ActivatedRoute) {
        this.ftConfitService = ftConfitService;
    }

    ngOnInit(): void {
        console.log(this.title);
        this.queryImageListByGoodsId();
    }

    queryImageListByGoodsId() {
        this.templateConfigList = [];
        this.ftConfitService.getAllPackagesImageByGoodsId(this.formData.goodsId + '').subscribe(res => {
            const result = this.filterResult(res.json());
            if (result !== null) {
                result.forEach(e => {
                    this.templateConfigList.push(environment.PKG_IMG_SHOW_URL + e.image);
                });
            }
        });

    }

    filterResult(data): any {
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
