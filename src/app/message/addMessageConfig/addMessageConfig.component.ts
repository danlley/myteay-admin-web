import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';

@Component({
    selector: 'app-add-message-config',
    templateUrl: './addMessageConfig.component.html',
    styleUrls: ['./addMessageConfig.component.css']
})
export class AddMessageConfigComponent implements OnInit {
    title = 'add message config!';
    ftConfitService: FatigeConfigService;
    data: any[];


    constructor(ftConfitService: FatigeConfigService) {
        this.ftConfitService = ftConfitService;
    }

    ngOnInit(): void {
        console.log(this.title);
    }


}
