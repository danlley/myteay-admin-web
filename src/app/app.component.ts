import {Component, OnInit} from '@angular/core';
import {EventService} from './asyncService/asyncService.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'app works!';

    constructor(private eventBus: EventService, private router: Router) {

        // 疲劳度管理页面跳转事件监听
        this.eventBus.registerySubject('fatige_indicator_config_query').subscribe(e => {
            this.router.navigateByUrl('customer/query');
        });

        // 消息管理页面跳转事件监听
        this.eventBus.registerySubject('message_manager').subscribe(e => {
            this.router.navigateByUrl('message/query');
        });

        // 添加消息模板配置页面跳转事件监听
        this.eventBus.registerySubject('add_message_config').subscribe(e => {
            this.router.navigateByUrl('message/add');
        });

        // 修改消息模板配置页面跳转事件监听
        this.eventBus.registerySubject('modify_message_config').subscribe(e => {
            this.router.navigateByUrl('message/modify');
        });
    }

    ngOnInit(): void {
    }
}
