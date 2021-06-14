import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {DatePipe} from '@angular/common';
import {CommonServie} from '../../utils/common.servie';
import {PxShopStatusEnum} from '../../commons/enums/PxShopStatusEnum';

@Component({
    selector: 'app-goods',
    templateUrl: './goods.component.html',
    styleUrls: ['./goods.component.css']
})

/**
 * 商品管理组件
 */
export class GoodsComponent implements OnInit {
    title = '商品概要管理!';
    contactKey: string;
    templateConfigList: any[];

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
    constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe, public pxShopStatusEnum: PxShopStatusEnum,
                private commonService: CommonServie) {
    }

    /**
     * 初始化组件
     */
    ngOnInit(): void {
        console.log(this.title);
        this.initShopList();
    }

    /**
     * 构建店铺信息列表，用于进入店铺进行相应的商品管理
     */
    initShopList() {
        this.tableElement = {
            'tableHeaders': [],
            'tableOp': [['立即管理商品', 'system_goods_manage_all']],
            'tableContent': []
        };
        this.ftConfitService.getAllShopConfig().subscribe(res => {
            this.templateConfigList = this.commonService.filterResult(res);
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

    /**
     * 转换店铺状态码为对应的店铺状态值
     *
     * @param {string} shopStatus
     * @returns {string}
     */
    private getShopSwitchShow(shopStatus: string): string {
        let shopStatusActural = '';
        this.pxShopStatusEnum.values.forEach(e => {
            if (e[0] === shopStatus) {
                shopStatusActural = e[1];
            }
        });

        return shopStatusActural;
    }



}
