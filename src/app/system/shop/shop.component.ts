import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {DatePipe} from '@angular/common';
import {EventService} from '../../asyncService/asyncService.service';
import {CommonServie} from '../../utils/common.servie';
import {PxShopConfigModel} from '../../model/shop';
import {PxShopStatusEnum} from '../../commons/enums/PxShopStatusEnum';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css']
})

/**
 * 店铺管理组件
 */
export class ShopComponent implements OnInit {
    title = '店铺管理';
    contactKey: string;
    templateConfigList: any[];

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
     * @param {EventService} eventBus
     */
    constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe, public pxShopStatusEnum: PxShopStatusEnum,
                private commonService: CommonServie, private eventBus: EventService) {
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

    /**
     * 初始化组件
     */
    ngOnInit(): void {
        console.log(this.title);
        this.initShopList();
    }

    /**
     * 删除店铺组件
     *
     * @param {number} shopId
     */
    deleteSingleShop(shopId: number) {
        const deleteData = new PxShopConfigModel();
        deleteData.shopId = shopId;
        deleteData.operationType = 'PX_DELETE';
        console.log('=======================>', deleteData);
        this.ftConfitService.manageShopConfig(deleteData).subscribe(res => {
            console.log('=======================>', res);
            const data = res;
            this.errMsg = '';
            if (data.operateResult !== 'CAMP_OPERATE_SUCCESS') {
                this.isNeedShowErrMsg = true;
                this.errMsg = '删除店铺出错---------> 错误码:' + data.errorCode + '　　　　　　错误详情:' + data.errorDetail;
            }
            this.initShopList();
        });
    }

    doQuery() {
        this.errMsg = '';
        this.isNeedShowErrMsg = false;
        this.initShopList();
    }

    /**
     * 初始化店铺列表
     */
    initShopList() {

        this.tableElement = {
            'tableHeaders': [],
            'tableOp': [['详情', 'single_shop_detail'], ['修改', 'single_shop_modify'], ['删除', 'single_shop_delete']],
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
     * 进入添加店铺页面
     */
    public gotoAddShop(): void {
        this.eventBus.publish('system_shop_add', this.title);
    }

    /**
     * 获取店铺状态的中文解释
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
