import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-customer-side-left',
    templateUrl: './customerSideLeft.component.html',
    styleUrls: ['./customerSideLeft.component.css']
})
export class CustomerSideLeftComponent implements OnInit {
    title = 'add message config!';
    data: any[];


    constructor() {
    }

    ngOnInit(): void {
        console.log(this.title);
    }


}
