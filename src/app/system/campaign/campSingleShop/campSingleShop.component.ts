import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {DatePipe} from '@angular/common';
import {CommonServie} from '../../../utils/common.servie';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../../asyncService/asyncService.service';

declare let laydate;

@Component({
    selector: 'app-camp-shop-single',
    templateUrl: './campSingleShop.component.html',
    styleUrls: ['./campSingleShop.component.css']
})

/**
 * 店铺内营销活动管理组件
 */
export class CampSingleShopComponent implements OnInit {
    title = '店内营销活动管理!';
    campStatusList: any[];
    templateConfigList: any[];

    // 店铺信息，用于构建页面店铺信息展示
    shopData;
    campBaseModel: CampBaseModel = new CampBaseModel();

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
        this.shopData = this.commonService.initShopData(this.activeRoute.snapshot.queryParams['data']);

        this.initCampStatusList();
        this.initCampBaseList();

        // 初始化日期选择组件
        laydate.render({
            elem: '#test1', // s为页面日期选择输入框的id
            type: 'datetime',
            theme: '#22787a',
            done: (value, date) => {
                this.campBaseModel.campStart = value;
                console.log(value);
                console.log(date);
            }
        });

        // 初始化日期选择组件
        laydate.render({
            elem: '#test2', // s为页面日期选择输入框的id
            type: 'datetime',
            theme: '#22787a',
            done: (value, date) => {
                this.campBaseModel.campEnd = value;
                console.log(value);
                console.log(date);
            }
        });
    }

    gotoAddCampBase() {
        this.campBaseModel.shopId = this.shopData[0];
        this.campBaseModel.shopName = this.shopData[1];
        console.log('----------------------------------->', this.campBaseModel);
        this.campBaseModel.operationType = 'PX_ADD';
        this.ftConfitService.manageCampBaseConfig(this.campBaseModel).subscribe(res => {
            console.log('=======================>', res.json());
            this.doQuery();
        });
    }

    /**
     * 构建店内营销活动列表，用于进入店铺进行相应的店内营销活动管理
     */
    initCampBaseList() {
        this.tableElement = {
            'tableHeaders': [],
            'tableOp': [['停止', 'camp_shop_single_shutdown'],
                ['删除', 'camp_shop_single_shutdown'],
                ['启动', 'camp_shop_single_start'],
                ['查看', 'camp_shop_single_view'],
                ['添加奖品', 'camp_shop_single_mng']],
            'tableContent': []
        };
        this.ftConfitService.getShopAllCampBaseConfig(this.shopData[0]).subscribe(res => {
            this.templateConfigList = this.commonService.filterResult(res.json());
            this.tableElement.tableHeaders = ['活动ID', '活动名称', '活动开始时间', '活动结束时间', '活动状态', '创建时间', '修改时间'];
            this.templateConfigList.forEach(e => {
                const gmtCreated = this.datePipe.transform(e.gmtCreated, 'yyyy-MM-dd HH:mm:ss');
                const gmtModified = this.datePipe.transform(e.gmtModified, 'yyyy-MM-dd HH:mm:ss');
                const campStart = this.datePipe.transform(e.campStart, 'yyyy-MM-dd HH:mm:ss');
                const campEnd = this.datePipe.transform(e.campEnd, 'yyyy-MM-dd HH:mm:ss');
                const campStatus = this.getCampSwitchShow(e.campStatus);
                this.tableElement.tableContent.push([e.campId, e.campName, campStart, campEnd,
                    campStatus, gmtCreated, gmtModified]);
            });
        });
    }

    /**
     * 转换店内营销活动状态码为对应的店内营销活动状态值
     *
     * @param {string} campStatus
     * @returns {string}
     */
    private getCampSwitchShow(campStatus: string): string {
        if (this.campStatusList === null) {
            return '';
        }

        let campStatusActural = '';
        this.campStatusList.forEach(e => {
            if (e.bizKey === campStatus) {
                campStatusActural = e.value;
            }
        });

        return campStatusActural;
    }

    initCampStatusList() {
        this.ftConfitService.getDataDictionaryByKey('CampStatusEnum').subscribe(res => {
            this.campStatusList = this.commonService.filterResult(res.json());
        });
    }

    /**
     * 刷新当前营销活动列表
     */
    doQuery() {
        this.initCampBaseList();
    }

    /**
     * 返回店铺列表页面
     */
    goReturn() {
        this.eventBus.publish('campaign_shop', this.shopData);
    }
}

export class CampBaseModel {
    campId: string;
    campName: string;
    shopId: string;
    shopName: string;
    campStatus = 'CAMP_DRAFT';
    campStart: string;
    campEnd: string;
    operationType = 'PX_ADD';
}