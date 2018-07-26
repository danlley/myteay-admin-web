import {Component, Input, OnInit} from '@angular/core';
import {EventService} from '../asyncService/asyncService.service';

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
    @Input() tableTitle = 'add message config!';

    /** 表格主题 */
    @Input() tableTitleFace = 'add message config!';

    /** 用于表格页面渲染的数据，需要通过父组件传入 */
    @Input() tableElement = [];

    constructor() {
    }

    ngOnInit(): void {
        console.log('----------------->', this.tableElement);
    }


}

