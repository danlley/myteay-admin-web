import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-summary-table',
    templateUrl: './summaryTable.component.html',
    styleUrls: ['./summaryTable.component.css']
})

/**
 *  通用无分页表格组件
 */
export class SummaryTableComponent implements OnInit {

    /** 表格主题 */
    @Input() tableTitle = '商品管理通用汇总表';

    /** 表格主题 */
    @Input() tableTitleFace = '';

    /** 用于表格页面渲染的数据，需要通过父组件传入 */
    @Input() tableElement = [];
    @Input() shopData = [];

    /**
     * 组件构造
     */
    constructor() {
    }

    /**
     * 表格基本信息的初始化工作
     */
    ngOnInit(): void {
        this.constructSummaryTableData();
    }

    /**
     *  初始化表格数据
     */
    private constructSummaryTableData() {

        if (this.shopData === undefined || this.shopData === null || this.shopData.length === 0) {
            console.log('当前数据不可用--------------------》shopData')
            return;
        }

        const id: PxSummaryTableElement = new PxSummaryTableElement();
        id.face = '店铺ID';
        id.value = this.shopData[0];

        const name: PxSummaryTableElement = new PxSummaryTableElement();
        name.face = '店铺名称';
        name.value = this.shopData[1];

        const owner: PxSummaryTableElement = new PxSummaryTableElement();
        owner.face = '店主';
        owner.value = this.shopData[2];

        const status: PxSummaryTableElement = new PxSummaryTableElement();
        status.face = '店铺状态';
        status.value = this.shopData[3];

        const expired: PxSummaryTableElement = new PxSummaryTableElement();
        expired.face = '过期时间';
        expired.value = this.shopData[5];

        const address: PxSummaryTableElement = new PxSummaryTableElement();
        address.face = '店铺地址';
        address.value = this.shopData[4];
        this.tableElement = [[id, name, owner], [status, expired, address]];
    }

}

/**
 * 表格数据模型
 */
export class PxSummaryTableElement {
    face: string;
    value: string;
}
