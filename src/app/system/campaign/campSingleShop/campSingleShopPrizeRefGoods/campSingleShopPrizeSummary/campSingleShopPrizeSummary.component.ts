import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-camp-prize-summary-table',
    templateUrl: './campSingleShopPrizeSummary.component.html',
    styleUrls: ['./campSingleShopPrizeSummary.component.css']
})

/**
 *  通用无分页表格组件
 */
export class CampSingleShopPrizeSummaryComponent implements OnInit {

    /** 表格 */
    @Input() viewData = [];

    /**
     * 组件构造
     */
    constructor() {
    }

    /**
     * 表格基本信息的初始化工作
     */
    ngOnInit(): void {
    }
}
