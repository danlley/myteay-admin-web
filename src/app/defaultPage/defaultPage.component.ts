import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-default-page',
    templateUrl: 'defaultPage.component.html',
    styleUrls: ['./defaultPage.component.css']
})
export class DefaultPageComponent implements OnInit {

    title = '默认欢迎页面!';

    ngOnInit(): void {
    }
}
