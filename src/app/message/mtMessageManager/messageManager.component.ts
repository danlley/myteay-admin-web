import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../asyncService/asyncService.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-message-manager',
    templateUrl: './messageManager.component.html',
    styleUrls: ['./messageManager.component.css']
})
export class MessageManagerComponent implements OnInit {
    title = 'messageManager';
    ftConfitService: FatigeConfigService;
    data: any[];
    channelTypeList: any[];
    templateFlagList: any[];
    templateTypeList: any[];
    templateConfigList: any[];
    queryData: any = new TemplateConfigQueryData();
    tableElement = {
        'tableHeaders': [],
        'tableContent': []
    };

    constructor(ftConfitService: FatigeConfigService, private eventBus: EventService, private router: Router) {
        this.ftConfitService = ftConfitService;

        this.eventBus.registerySubject('messageManager').subscribe(e => {
            this.tableInnerOperation(e);
        });

        // 修改消息模板配置页面跳转事件监听
        this.eventBus.registerySubject('MODIFY_DETAIL').subscribe(e => {
            this.router.navigateByUrl('message/modify');
        });
    }
    ngOnInit(): void {
        console.log(this.title);
        this.initMsTemplateFlagEnumList();
        this.initMsTemplateTypeEnumList();
        this.initMsChannelTypeEnumList();
        console.log('+++++++++++++++++++++++++++++==-->', this.tableElement);
    }

    tableInnerOperation(data) {
        console.log('开始执行表格内部动作', data);
    }

    queryAllMessageConfigByParam() {
        console.log('开始批量多条件查询消息配置列表-->', this.queryData);
        this.tableElement = {
            'tableHeaders': [],
            'tableContent': []
        };
        this.ftConfitService.queryAllMessageConfigByParam(this.queryData).subscribe(res => {
            this.templateConfigList = this.filterResult(res.json());
            this.tableElement.tableHeaders = ['流水号', '渠道类型', '模板状态', '模板类型', '过期时间', '创建时间', '最后修改时间'];
            this.templateConfigList.forEach(e => {
                this.tableElement.tableContent.push([e.id, e.channelType, e.templateFlag,
                    e.templateType, e.expireTime, e.gmtCreated, e.gmtModified]);
            });

            console.log('templateConfigList--------->', this.templateConfigList);
        });
    }

    initMsChannelTypeEnumList() {
        this.ftConfitService.getMessageDataDictionaryByKey('MsChannelTypeEnum').subscribe(res => {
            this.channelTypeList = this.filterResult(res.json());
        });
    }

    initMsTemplateFlagEnumList() {
        this.ftConfitService.getMessageDataDictionaryByKey('MsTemplateFlagEnum').subscribe(res => {
            this.templateFlagList = this.filterResult(res.json());
        });
    }

    initMsTemplateTypeEnumList() {
        this.ftConfitService.getMessageDataDictionaryByKey('MsTemplateTypeEnum').subscribe(res => {
            this.templateTypeList = this.filterResult(res.json());
        });
    }

    filterResult(result): any {

        if ('操作成功' !== result.operateResult) {
            console.log('返回结果失败：', result);
            return null;
        }
        return result.result;
    }
}

export class TemplateConfigQueryData {
    channelType: string;
    templateFlag: string;
    templateType: string;
}
