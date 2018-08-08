import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {DatePipe} from '@angular/common';
import {CommonServie} from '../../utils/common.servie';

@Component({
    selector: 'app-goods',
    templateUrl: './goods.component.html',
    styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit {
    title = '商品概要管理!';
    contactList: any[];
    contactKey: string;
    templateConfigList: any[];

    tableElement = {
        'tableHeaders': [],
        'tableOp': [],
        'tableContent': []
    };

    constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe,
                private commonService: CommonServie) {
    }

    ngOnInit(): void {
        console.log(this.title);
        this.initContactList();
        this.initShopList();
    }

    initShopList() {
        this.tableElement = {
            'tableHeaders': [],
            'tableOp': [['立即管理商品', 'system_goods_manage_all']],
            'tableContent': []
        };
        this.ftConfitService.getAllShopConfig().subscribe(res => {
            this.templateConfigList = this.commonService.filterResult(res.json());
            this.tableElement.tableHeaders = ['流水号', '店铺名称', '店主', '店铺状态', '地址', '过期时间', '创建时间'];
            this.templateConfigList.forEach(e => {
                const gmtCreated = this.datePipe.transform(e.gmtCreated, 'yyyy-MM-dd HH:mm:ss');
                const gmtExpired = this.datePipe.transform(e.gmtExpired, 'yyyy-MM-dd HH:mm:ss');
                const shopStatus = this.getShopSwitchShow(e.shopStatus);
                this.tableElement.tableContent.push([e.shopId, e.shopName, e.ownerName, shopStatus,
                    e.shopAddress, gmtExpired, gmtCreated]);
            });
        });
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
            this.contactList = this.commonService.filterResult(res.json());
        });
    }

}
