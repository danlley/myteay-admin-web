import {Component, Input, OnInit} from '@angular/core';
import {EventService} from '../asyncService/asyncService.service';

@Component({
    selector: 'app-table-no-paginator',
    templateUrl: './tableNoPaginator.component.html',
    styleUrls: ['./tableNoPaginator.component.css']
})

/**
 *  通用无分页表格组件
 */
export class TableNoPaginatorComponent implements OnInit {

    /** 表格主题，用于区分不同的表格引入者，此数据会作为异步事件发送的主题，方便表格组件引入者进行订阅 */
    @Input() tableTitle = 'add message config!';

    /** 用于表格页面渲染的数据，需要通过父组件传入 */
    @Input() tableElement = {
        'tableHeaders': [],
        'tableContent': []
    };

    eventBus: EventService;

    /**
     * 构造方法，用于发送异步事件。当前表格的引入者需要监听异步事件，通过监听到的异步事件完成相应的目标动作
     *
     * @param {EventService} eventBus
     */
    constructor(eventBus: EventService) {
        this.eventBus = eventBus;
    }

    ngOnInit(): void {
        console.log('----------------->', this.tableElement);
    }

    /**
     * 向外发布异步事件，确保当前表格组件的引入者能够完成其目标动作
     *
     * @param currentTableElement   当前表格行中数据
     * @param operation             目标操作类型（VIEW_DETAIL, MODIFY_DETAIL, DELETE_DETAIL）
     */
    tableNoPaginatorOperation(currentTableElement, operation) {
        console.log('执行查询动作：  operation=' + operation, currentTableElement);
        this.eventBus.publish(operation, currentTableElement);
    }

}

