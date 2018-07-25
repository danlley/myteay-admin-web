import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-system-side-left',
    templateUrl: './systemSideLeft.component.html',
    styleUrls: ['./systemSideLeft.component.css']
})
export class SystemSideLeftComponent implements OnInit {
    title = 'add message config!';
    data: any[];


    constructor() {
    }

    ngOnInit(): void {
        console.log(this.title);
    }


}
