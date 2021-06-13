import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {EventService} from '../../../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {FatigeConfigService} from '../../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {CommonServie} from '../../../../../utils/common.servie';
import {environment} from '../../../../../../environments/environment.prod';

@Component({
    selector: 'app-camp-prize-goods-item',
    templateUrl: './campSingleShopPrizeRefGoodsItem.component.html',
    styleUrls: ['./campSingleShopPrizeRefGoodsItem.component.css']
})

/**
 *  通用无分页表格组件
 */
export class CampSingleShopPrizeRefGoodsItemComponent implements OnInit {

    /** 表格 */
    @Input() goods: any ={};

    imgPath = environment.PKG_IMG_SHOW_URL;

    /**
     * 组件构造
     */
    constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe,
                private commonService: CommonServie, private activeRoute: ActivatedRoute, private eventBus: EventService) {
    }

    /**
     * 表格基本信息的初始化工作
     */
    ngOnInit(): void {
    }

}

export class CampPrizeModel {
    prizeId: string;
    prizeName: string;
    campId: string;
    shopId: string;
    prizeLevel: string;
    prizePercent: string;
    distribution: string;
    price: string;
    prizeAmount: string;
    prizeStatus = 'CAMP_PRIZE_DRAFT';
    prizeEffictive: string;
    prizeExpired: string;
    gmtCreated: string;
    gmtModified: string;
    operationType = 'PX_ADD';
}
