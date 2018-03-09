import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-message-side-left',
    templateUrl: './messageSideLeft.component.html',
    styleUrls: ['./messageSideLeft.component.css']
})
export class MessageSideLeftComponent implements OnInit {
    title = 'add message config!';
    data: any[];


    constructor() {
    }

    ngOnInit(): void {
        console.log(this.title);
    }


}
