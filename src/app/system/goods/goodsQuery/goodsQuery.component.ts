import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {PxGoodsConfigModel} from '../../../model/goods';
import {CommonServie} from '../../../utils/common.servie';

@Component({
    selector: 'app-query-goods',
    templateUrl: './goodsQuery.component.html',
    styleUrls: ['./goodsQuery.component.css']
})

export class GoodsQueryComponent implements OnInit {

    title = '商品概要管理!';
    contactList: any[];
    templateConfigList: any[];
    shopData;

    tableElement = {
        'tableHeaders': [],
        'tableOp': [],
        'tableContent': []
    };

    constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe, private commonService: CommonServie,
                public activeRoute: ActivatedRoute, private eventBus: EventService) {
        this.eventBus.registerySubject('system_goods_for_view_detail').subscribe(e => {
            const sendData = [this.shopData, e[0]];
            console.log('表格操作目标（详情）：', sendData);
            this.eventBus.publish('system_goods_view_detail', sendData);
        });

        this.eventBus.registerySubject('single_goods_for_modify').subscribe(e => {
            const sendData = [this.shopData, e[0]];
            console.log('表格操作目标（修改）：', sendData);
            this.eventBus.publish('system_goods_modify', sendData);
        });

        this.eventBus.registerySubject('system_goods_packages_for_all').subscribe(e => {
            const sendData = [this.shopData, e];
            console.log('表格操作目标（维护）：', sendData);
            this.eventBus.publish('system_goods_packages_all', sendData);
        });

        this.eventBus.registerySubject('system_goods_packages_notice_for_all').subscribe(e => {
            const sendData = [this.shopData, e];
            console.log('表格操作目标（温馨提醒维护）：', sendData);
            this.eventBus.publish('system_goods_packages_notice_all', sendData);
        });

        this.eventBus.registerySubject('system_goods_packages_image_for_all').subscribe(e => {
            const sendData = [this.shopData, e];
            console.log('表格操作目标（套餐详情图片）：', sendData);
            this.eventBus.publish('system_goods_packages_image_all', sendData);
        });

        this.eventBus.registerySubject('single_goods_delete').subscribe(e => {
            console.log('表格操作目标（删除）：', e[0]);
            this.deleteSingleGoods(e[0]);
        });
    }

    ngOnInit(): void {
        this.initShopData();
        this.initContactList();
        this.initGoodsList();
    }

    private initShopData() {
        const tmpData: string = this.activeRoute.snapshot.queryParams['data'];
        const tmpArr: string[] = tmpData.split(',');
        this.shopData = tmpArr;
        console.log('=====--------->', this.shopData);
    }

    load() {
        this.initGoodsList();
    }

    deleteSingleGoods(goodsId: number) {
        const deleteData = new PxGoodsConfigModel();
        deleteData.goodsId = goodsId;
        deleteData.operationType = 'PX_DELETE';
        console.log('=======================>', deleteData);
        this.ftConfitService.manageGoodsConfig(deleteData).subscribe(res => {
            console.log('=======================>', res.json());
            this.initGoodsList();
        });
    }

    initGoodsList() {
        this.tableElement = {
            'tableHeaders': [],
            'tableOp': [
                ['子套餐维护', 'system_goods_packages_for_all'],
                ['详情图片维护', 'system_goods_packages_image_for_all'],
                ['套餐提醒维护', 'system_goods_packages_notice_for_all'],
                ['发布', 'system_goods_for_view_detail'], ['下架', 'system_goods_for_view_detail'], ['详情', 'system_goods_for_view_detail'],
                ['修改', 'single_goods_for_modify'], ['删除', 'single_goods_delete']
            ],
            'tableContent': []
        };
        this.ftConfitService.getAllGoodsByShopId(this.shopData[0]).subscribe(res => {
            this.templateConfigList = this.commonService.filterResult(res.json());
            this.tableElement.tableHeaders = ['流水号', '商品名称', '套餐信息类型', '当前售价', '当前销量', '过期时间', '创建时间'];
            this.templateConfigList.forEach(e => {
                const gmtCreated = this.datePipe.transform(e.gmtCreated, 'yyyy-MM-dd HH:mm:ss');
                const gmtExpired = this.datePipe.transform(e.gmtExpired, 'yyyy-MM-dd HH:mm:ss');
                this.tableElement.tableContent.push([e.goodsId, e.goodsTitle, e.goodsDesc, e.goodsPrice, e.goodsSellAmount,
                    gmtExpired, gmtCreated]);
            });
        });
    }

    public gotoAddGoods(elements): void {
        this.eventBus.publish('system_goods_add', this.shopData);
    }

    initContactList() {
        this.ftConfitService.getDataDictionaryByKey('PxShopStatusEnum').subscribe(res => {
            this.contactList = this.commonService.filterResult(res.json());
        });
    }
}

