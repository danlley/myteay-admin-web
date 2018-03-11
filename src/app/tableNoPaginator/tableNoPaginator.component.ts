import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-table-no-paginator',
    templateUrl: './tableNoPaginator.component.html',
    styleUrls: ['./tableNoPaginator.component.css']
})


export class TableNoPaginatorComponent implements OnInit {
    title = 'add message config!';

    data: any[];
    @Input() tableElement = {
        'tableHeaders': [],
        'tableContent': []
    };


    constructor() {
    }

    ngOnInit(): void {
        console.log(this.title);
        console.log('----------------->', this.tableElement);
    }


}

