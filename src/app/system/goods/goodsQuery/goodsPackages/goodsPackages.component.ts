import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-query-goods',
    templateUrl: './goodsPackages.component.html',
    styleUrls: ['./goodsPackages.component.css']
})

export class GoodsPackagesComponent implements OnInit {

    title = '套餐包管理!';
    ftConfitService: FatigeConfigService;
    contactList: any[];
    templateConfigList: any[];
    shopData;
    goodsData;
    summaryTableElement: any[];
    goodsId;
    goodsPackagesDetailName;

    tableElement = {
        'tableHeaders': [],
        'tableOp': [],
        'tableContent': []
    };

    constructor(ftConfitService: FatigeConfigService, private datePipe: DatePipe,
                public activeRoute: ActivatedRoute, private eventBus: EventService) {
        this.ftConfitService = ftConfitService;

        // this.eventBus.registerySubject('system_goods_for_view_detail').subscribe(e => {
        //     const sendData = [this.shopData, e[0]];
        //     console.log('表格操作目标（详情）：', sendData);
        //     this.eventBus.publish('system_goods_view_detail', sendData);
        // });
        //
        // this.eventBus.registerySubject('single_goods_for_modify').subscribe(e => {
        //     const sendData = [this.shopData, e[0]];
        //     console.log('表格操作目标（修改）：', sendData);
        //     this.eventBus.publish('system_goods_modify', sendData);
        // });
        //
        // this.eventBus.registerySubject('single_goods_delete').subscribe(e => {
        //     console.log('表格操作目标（删除）：', e[0]);
        //     this.deleteSingleGoods(e[0]);
        // });
    }

    ngOnInit(): void {
        this.initShopData();
        this.initContactList();
        this.initGoodsList();
    }

    private initShopData() {
        const tmpData: string = this.activeRoute.snapshot.queryParams['shop'];
        const tmpArr: string[] = tmpData.split(',');
        this.shopData = tmpArr;
        console.log('=====--------->', this.shopData);

        const tmpGoodsData: string = this.activeRoute.snapshot.queryParams['goods'];
        const tmpGoodsArr: string[] = tmpGoodsData.split(',');
        this.goodsData = tmpGoodsArr;
        this.goodsId = this.goodsData[0];
        console.log('=====--------->', this.goodsData);

        this.constructSummaryTableData();
    }

    private constructSummaryTableData() {
        const goodsName: PxSummaryTableElement = new PxSummaryTableElement();
        goodsName.face = '商品名称';
        goodsName.value = this.goodsData[1];

        const name: PxSummaryTableElement = new PxSummaryTableElement();
        name.face = '店铺名称';
        name.value = this.shopData[1];

        const goodsType: PxSummaryTableElement = new PxSummaryTableElement();
        goodsType.face = '套餐类型';
        goodsType.value = this.goodsData[2];

        const price: PxSummaryTableElement = new PxSummaryTableElement();
        price.face = '当前售价';
        price.value = this.goodsData[3];

        const sellsAmount: PxSummaryTableElement = new PxSummaryTableElement();
        sellsAmount.face = '当前销量';
        sellsAmount.value = this.goodsData[4];

        const expired: PxSummaryTableElement = new PxSummaryTableElement();
        expired.face = '过期时间';
        expired.value = this.goodsData[5];

        this.summaryTableElement = [[name, goodsName, goodsType], [price, sellsAmount, expired]];
    }

    load() {
        this.initGoodsList();
    }

    deleteSingleGoods(goodsId: number) {
        const deleteData = new PxGoodsConfigModel();
        deleteData.goodsId = goodsId;
        console.log('=======================>', deleteData);
        this.ftConfitService.manageGoodsConfig(deleteData).subscribe(res => {
            console.log('=======================>', res.json());
            this.initGoodsList();
        });
    }

    initGoodsList() {
        this.tableElement = {
            'tableHeaders': [],
            'tableOp': [['修改', 'single_goods_for_modify'], ['删除', 'single_goods_delete']],
            'tableContent': []
        };
        this.ftConfitService.getAllGoodsByShopId(this.shopData[0]).subscribe(res => {
            this.templateConfigList = this.filterResult(res.json());
            this.tableElement.tableHeaders = ['自套餐流水号', '套餐包ID', '子商品名称', '子商品数量', '子套餐类型', '子商品单价', '创建时间'];
            this.templateConfigList.forEach(e => {
                const gmtCreated = this.datePipe.transform(e.gmtCreated, 'yyyy-MM-dd hh:mm:ss');
                const gmtExpired = this.datePipe.transform(e.gmtExpired, 'yyyy-MM-dd hh:mm:ss');
                this.tableElement.tableContent.push([e.goodsId, e.goodsTitle, e.goodsDesc, e.goodsPrice, e.goodsSellAmount,
                    gmtExpired, gmtCreated]);
            });
        });
    }

    public gotoAddGoods(): void {
        this.eventBus.publish('system_goods_add', this.shopData);
    }

    initContactList() {
        this.ftConfitService.getDataDictionaryByKey('PxShopStatusEnum').subscribe(res => {
            this.contactList = this.filterResult(res.json());
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

export class PxSummaryTableElement {
    face: string;
    value: string;
}

export class PxGoodsConfigModel {
    goodsId: number;
    operationType = 'PX_DELETE';
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
