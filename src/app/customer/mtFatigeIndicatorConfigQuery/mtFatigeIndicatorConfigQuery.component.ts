import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from './service/fatigeConfig.service';

@Component({
    selector: 'app-mt-fatige-indicator-config-query',
    templateUrl: './mtFatigeIndicatorConfigQuery.component.html',
    styleUrls: ['./mtFatigeIndicatorConfigQuery.component.css']
})
export class MtFatigeIndicatorConfigQueryComponent implements OnInit {
    title = '疲劳度控制配置查询!';
    ftConfitService: FatigeConfigService;
    data: any[];
    contactList: any[];
    fatigeSwitchList: any[];
    contactKey: string;
    fatigeSwitchKey: string;
    errorMessage: string;

    constructor(ftConfitService: FatigeConfigService) {
        this.ftConfitService = ftConfitService;
    }

    ngOnInit(): void {
        console.log(this.title);
        this.initContactList();
        this.initFatigeSwitchFlagList();
    }

    load() {

        console.log('================>', this.contactKey);
        console.log('================>', this.fatigeSwitchKey);

        if (this.contactKey === undefined && this.fatigeSwitchKey === undefined) {
            console.log('+++++++++++++++++++++++++++++>');
        }
        this.ftConfitService.getAllFatigeIndicatorConfig().subscribe(res => {
            this.data = this.filterResult(res.json());
            console.log('疲劳度查询结果：', this.data);
            if (this.data === null) {
                this.errorMessage = '未找到相关配置信息';
            }
        });
    }

    initFatigeSwitchFlagList() {
        this.ftConfitService.getDataDictionaryByKey('MtFatigeConfigSwitchFlagEnum').subscribe(res => {
            this.fatigeSwitchList = this.filterResult(res.json());
        });
    }

    initContactList() {
        this.ftConfitService.getDataDictionaryByKey('MtContactTypeEnum').subscribe(res => {
            this.contactList = this.filterResult(res.json());
        });
    }

    filterResult(data): any {
        console.log('开始过滤处理结果：', data);

        if ('CAMP_OPERATE_SUCCESS' !== data.operateResult) {
            console.log('返回结果失败：', data);
            return null;
        }
        return data.result;
    }
}
