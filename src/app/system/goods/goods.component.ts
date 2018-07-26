import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {DatePipe} from '@angular/common';
import {EventService} from '../../asyncService/asyncService.service';

@Component({
    selector: 'app-goods',
    templateUrl: './goods.component.html',
    styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit {
    title = '商品概要管理!';
    ftConfitService: FatigeConfigService;
    contactList: any[];
    contactKey: string;
    templateConfigList: any[];

    tableElement = {
        'tableHeaders': [],
        'tableOp': [],
        'tableContent': []
    };

    constructor(ftConfitService: FatigeConfigService, private datePipe: DatePipe, private eventBus: EventService) {
        this.ftConfitService = ftConfitService;

        this.eventBus.registerySubject('single_shop_detail').subscribe(e => {
            console.log('表格操作目标（详情）：', e[0]);
            this.eventBus.publish('system_shop_view_detail', e[0]);
        });

        this.eventBus.registerySubject('single_shop_modify').subscribe(e => {
            console.log('表格操作目标（修改）：', e[0]);
            this.eventBus.publish('system_shop_modify', e[0]);
        });

        this.eventBus.registerySubject('single_shop_delete').subscribe(e => {
            console.log('表格操作目标（删除）：', e[0]);
            this.deleteSingleShop(e[0]);
        });
    }

    ngOnInit(): void {
        console.log(this.title);
        this.initContactList();
        this.initShopList();
    }

    load() {
        this.initShopList();
    }

    deleteSingleShop(shopId: number) {
        const deleteData = new PxShopConfigModel();
        deleteData.shopId = shopId;
        console.log('=======================>', deleteData);
        this.ftConfitService.manageShopConfig(deleteData).subscribe(res => {
            console.log('=======================>', res.json());
            this.initShopList();
        });
    }

    initShopList() {
        this.tableElement = {
            'tableHeaders': [],
            'tableOp': [['立即管理商品', 'system_goods_manage_all']],
            'tableContent': []
        };
        this.ftConfitService.getAllShopConfig().subscribe(res => {
            this.templateConfigList = this.filterResult(res.json());
            this.tableElement.tableHeaders = ['流水号', '店铺名称', '店主', '店铺状态', '地址', '过期时间', '创建时间'];
            this.templateConfigList.forEach(e => {
                const gmtCreated = this.datePipe.transform(e.gmtCreated, 'yyyy-MM-dd hh:mm:ss');
                const gmtExpired = this.datePipe.transform(e.gmtExpired, 'yyyy-MM-dd hh:mm:ss');
                const shopStatus = this.getShopSwitchShow(e.shopStatus);
                this.tableElement.tableContent.push([e.shopId, e.shopName, e.ownerName, shopStatus,
                    e.shopAddress, gmtExpired, gmtCreated]);
            });
        });
    }

    public gotoAddShop(): void {
        this.eventBus.publish('system_shop_add', this.title);
    }

    private getShopSwitchShow(shopStatus: string): string {
        if (this.contactList === null) {
            return '';
        }

        let shopStatusActural = '';
        this.contactList.forEach(e => {
            if (e.bizKey === shopStatus) {
                shopStatusActural = e.value;
            }
        });

        return shopStatusActural;
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

export class PxShopConfigModel {
    shopId: number;
    shopName: string;
    shopAddress: string;
    shopTel: string;
    waiterName: string;
    ownerName: string;
    ownerPhone: string;
    ownerIdcard: string;
    shopStatus: string;
    operationType = 'PX_DELETE';
    gmtExpired: string;
    gmtCreated: string;
    gmtModified: string;
}
