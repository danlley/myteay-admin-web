import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-camp-summary-table',
    templateUrl: './campSummaryTable.component.html',
    styleUrls: ['./campSummaryTable.component.css']
})

/**
 *  通用无分页表格组件
 */
export class CampSummaryTableComponent implements OnInit {

    /** 表格主题 */
    @Input() tableTitle = '店内营销通用汇总表';

    /** 表格主题 */
    @Input() tableTitleFace = '';

    /** 用于表格页面渲染的数据，需要通过父组件传入 */
    @Input() tableElement = [];
    @Input() shopData = [];
    @Input() campData = [];

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

        console.log('--===-----=====--->', this.shopData);

        const id: PxSummaryTableElement = new PxSummaryTableElement();
        id.face = '活动ID';
        id.value = this.campData[0];

        const name: PxSummaryTableElement = new PxSummaryTableElement();
        name.face = '活动名称';
        name.value = this.campData[1];

        const owner: PxSummaryTableElement = new PxSummaryTableElement();
        owner.face = '活动开始时间';
        owner.value = this.campData[2];

        const status: PxSummaryTableElement = new PxSummaryTableElement();
        status.face = '结束时间';
        status.value = this.campData[3];

        const expired: PxSummaryTableElement = new PxSummaryTableElement();
        expired.face = '店铺名称';
        expired.value = this.shopData[1];

        const address: PxSummaryTableElement = new PxSummaryTableElement();
        address.face = '活动状态';
        address.value = this.campData[4];
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
