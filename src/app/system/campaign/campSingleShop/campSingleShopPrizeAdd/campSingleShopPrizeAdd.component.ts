import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {DatePipe} from '@angular/common';
import {CommonServie} from '../../../../utils/common.servie';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../../../asyncService/asyncService.service';

declare let laydate;

@Component({
    selector: 'app-camp-shop-single-prize-add',
    templateUrl: './campSingleShopPrizeAdd.component.html',
    styleUrls: ['./campSingleShopPrizeAdd.component.css']
})

/**
 * 店铺内营销活动奖品管理组件
 */
export class CampSingleShopPrizeAddComponent implements OnInit {
    title = '店内营销活动奖品管理!';
    campStatusList: any[];
    campPrizeLimitList: any[];
    campPrizeTypeList: any[];
    templateConfigList: any[];

    // 店铺信息，用于构建页面店铺信息展示
    shopData;
    campData;

    campPrizeModel: CampPrizeModel = new CampPrizeModel();

    isNeedShowErrMsg = false;
    errMsg = '';

    campId = '';
    shopId = '';

    tableElement = {
        'tableHeaders': [],
        'tableOp': [],
        'tableContent': []
    };

    /**
     * 构建组件
     *
     * @param {FatigeConfigService} ftConfitService
     * @param {DatePipe} datePipe
     * @param {CommonServie} commonService
     */
    constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe,
                private commonService: CommonServie, private activeRoute: ActivatedRoute, private eventBus: EventService) {
    }

    /**
     * 初始化组件
     */
    ngOnInit(): void {
        console.log(this.title);

        // 初始化店铺信息
        // this.shopData = this.commonService.initShopData(this.activeRoute.snapshot.queryParams['data']);
      this.shopData = this.activeRoute.snapshot.queryParams['data'][0].split(',');
      this.campData = this.activeRoute.snapshot.queryParams['data'][1].split(',');
        this.campId = this.campData[0];
        this.shopId = this.shopData[0];
        this.campPrizeModel.campId = this.campId;
        this.campPrizeModel.shopId = this.shopId;
        this.campPrizeModel.prizeEffictive = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
        const dateEnd = new Date();
        dateEnd.setMonth(dateEnd.getMonth() + 1);
        this.campPrizeModel.prizeExpired = this.datePipe.transform(dateEnd, 'yyyy-MM-16 23:59:59');

        this.initCampStatusList();

        // 初始化日期选择组件
        laydate.render({
            elem: '#test1', // s为页面日期选择输入框的id
            type: 'datetime',
            theme: '#22787a',
            value: this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            done: (value, date) => {
                this.campPrizeModel.prizeEffictive = value;
                console.log(value);
                console.log(date);
            }
        });

        // 初始化日期选择组件
        laydate.render({
            elem: '#test2', // s为页面日期选择输入框的id
            type: 'datetime',
            theme: '#22787a',
            value: new Date(),
            done: (value, date) => {
                this.campPrizeModel.prizeExpired = value;
                console.log(value);
                console.log(date);
            }
        });
    }

    doAddSingleShopCampPrize() {
        console.log('this.campPrizeModel------------------------->', this.campPrizeModel);
        this.campPrizeModel.operationType = 'PX_ADD';
        this.ftConfitService.manageCampPrizeConfig(this.campPrizeModel).subscribe(res => {
            console.log('=======================>', res);
            this.errMsg = '';
            const data = res;
            if (data.operateResult !== 'CAMP_OPERATE_SUCCESS') {
                this.isNeedShowErrMsg = true;
                this.errMsg = '奖品执行‘上架’出错---------> 错误码:' + data.errorCode + '　　　　　　错误详情:' + data.errorDetail;
            } else {
                this.eventBus.publish('campaign_shop_single_prize_mng', [this.shopData, this.campData]);
            }
        });
    }



    initCampStatusList() {
        this.ftConfitService.getDataDictionaryByKey('CampPrizeStatusEnum').subscribe(res => {
            this.campStatusList = this.commonService.filterResult(res);
        });
        this.ftConfitService.getDataDictionaryByKey('CampPrizeLimitEnum').subscribe(res => {
            this.campPrizeLimitList = this.commonService.filterResult(res);
        });
        this.ftConfitService.getDataDictionaryByKey('CampPrizeTypeEnum').subscribe(res => {
            this.campPrizeTypeList = this.commonService.filterResult(res);
        });
    }

    /**
     * 返回店铺列表页面
     */
    goReturn() {
        this.eventBus.publish('campaign_shop_single_prize_mng', [this.shopData, this.campData]);
    }
}

export class CampPrizeModel {
    prizeId: string;
    prizeName = '2元优惠券';
    prizeType = 'CAMP_COMMON_PRIZE';
    prizeLimit = 'CAMP_ALL_LIMIT';
    orderTotalAmount = '0.00';
    campId: string;
    shopId: string;
    prizeLevel: string;
    prizePercent = '100';
    distribution = 'GP:{P:15/30}';
    price = '2.00';
    prizeAmount = '999999';
    prizeStatus = 'CAMP_PRIZE_DRAFT';
    prizeEffictive: string;
    prizeExpired: string;
    operationType = 'PX_ADD';
}
