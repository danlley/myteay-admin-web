import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';

@Component({
    selector: 'app-message-manager',
    templateUrl: './messageManager.component.html',
    styleUrls: ['./messageManager.component.css']
})
export class MessageManagerComponent  implements OnInit {
    title = '------------------------------------messageManager!';
    ftConfitService: FatigeConfigService;
    data: any[];
    channelTypeList: any[];
    templateFlagList: any[];
    templateTypeList: any[];
    tableElement = {
        'tableHeaders': [],
        'tableContent': []
    };

    constructor(ftConfitService: FatigeConfigService) {
        this.ftConfitService = ftConfitService;
    }

    ngOnInit(): void {
        console.log(this.title);
        this.initMsTemplateFlagEnumList();
        this.initMsTemplateTypeEnumList();
        this.initMsChannelTypeEnumList();
        this.initList();
        console.log('+++++++++++++++++++++++++++++==-->', this.tableElement);
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
