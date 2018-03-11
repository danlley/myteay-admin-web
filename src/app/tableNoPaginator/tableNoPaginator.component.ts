import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-table-no-paginator',
    templateUrl: './tableNoPaginator.component.html',
    styleUrls: ['./tableNoPaginator.component.css']
})
export class TableNoPaginatorComponent implements OnInit {
    title = 'add message config!';

    data: any[];
    tableElement = {
        'tableHeaders': [],
        'tableContent': []
    };


    constructor() {
    }

    ngOnInit(): void {
        console.log(this.title);
        this.initList();
        console.log('----------------->', this.tableElement);
    }

    initList() {
        this.tableElement.tableContent = [
            ['1', '手机', '开通', '万能模板', '2342', '2018-03-11 17:37', '2018-03-11 17:37'],
            ['2', '手机', '开通', '万能模板', '2342', '2018-03-11 17:37', '2018-03-11 17:37'],
            ['3', '手机', '开通', '万能模板', '2342', '2018-03-11 17:37', '2018-03-11 17:37'],
            ['4', '手机', '开通', '万能模板', '2342', '2018-03-11 17:37', '2018-03-11 17:37']
        ];

        this.tableElement.tableHeaders = ['流水号', '渠道类型', '模板状态', '模板类型', '过期时间', '创建时间', '最后修改时间'];
    }

}

