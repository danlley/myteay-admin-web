import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {CommonServie} from '../../../utils/common.servie';
import {environment} from '../../../../environments/environment.prod';

@Component({
    selector: 'app-query-goods-cost-mng',
    templateUrl: './goodsCostMng.component.html',
    styleUrls: ['./goodsCostMng.component.css']
})

/**
 * 商品管理组件
 */
export class GoodsCostMngComponent implements OnInit {

    title = '商品管理!';

    // 当前店铺信息
    shopData;
    goodsCostCfgList;

    imgPath = environment.PKG_IMG_SHOW_URL;

    // 商品摘要信息展示列表数据结构
    tableElement = {
        'tableHeaders': [],
        'tableOp': [],
        'tableContent': []
    };

    isNeedShowErrMsg = false;
    errMsg = '';

    /**
     * 构建组件
     *
     * @param {FatigeConfigService} ftConfitService
     * @param {DatePipe} datePipe
     * @param {CommonServie} commonService
     * @param {ActivatedRoute} activeRoute
     * @param {EventService} eventBus
     */
    constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe, private commonService: CommonServie,
                public activeRoute: ActivatedRoute, private eventBus: EventService) {

        // 监听商品详情展示请求
        this.eventBus.registerySubject('system_goods_cost_mng_listener').subscribe(e => {
            console.log('表格操作目标（详情）：', e);
            this.eventBus.publish('system_goods_cost_mng', e);
        });

    }

    /**
     * 初始化当前组件
     */
    ngOnInit(): void {
        this.shopData = this.commonService.initShopData(this.activeRoute.snapshot.queryParams['data']);
        console.log('=====--------->', this.shopData);

        this.initGoodsPackagesList();
    }


    doQuery() {
        this.errMsg = '';
        this.isNeedShowErrMsg = false;
        this.initGoodsPackagesList();
    }

    /**
     * 初始化商品概要列表表格展示数据
     */
    initGoodsPackagesList() {
        this.tableElement = {
            'tableHeaders': [],
            'tableOp': [
                ['子套餐维护', 'system_goods_packages_for_all']
            ],
            'tableContent': []
        };

        let goodsStatusList = [];
        this.ftConfitService.getDataDictionaryByKey('PxGoodsStatusEnum').subscribe(res5 => {
            goodsStatusList = this.commonService.filterResult(res5.json());
        });

        this.tableElement.tableHeaders = ['图片', '流水号', '商品名称', '套餐信息类型', '当前售价', '商品成本（元）', '商品当前状态', '过期时间', '创建时间'];
        this.ftConfitService.getAllGoodsCostConfig(this.shopData[0]).subscribe(res => {
            this.goodsCostCfgList = this.commonService.filterResult(res.json());
            this.goodsCostCfgList.forEach(e => {
                e.showStatus = false;
                if (goodsStatusList !== null) {
                    goodsStatusList.forEach(s => {
                        if (s.bizKey === e.goodsStatus) {
                            e.goodsStatusShow = s.value;
                        }
                    });
                }
            });
        });
    }

    manageGoodsCost(tableContentElement) {
        console.log('=====--------->', tableContentElement);
        tableContentElement.showStatus = false;
        this.ftConfitService.manageGoodsCostConfig(tableContentElement).subscribe(res => {
            const goodsCostCfg = this.commonService.filterResult(res.json());
            console.log('成本单条信息处理结果--->', goodsCostCfg);
            this.initGoodsPackagesList();
        });
    }

    /**
     * 返回商品摘要列表页面
     */
    goReturn() {
        this.eventBus.publish('system_goods_cost', this.shopData);
    }
}
