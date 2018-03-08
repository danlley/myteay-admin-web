import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';

@Component({
    selector: 'app-message-manager',
    templateUrl: './messageManager.component.html',
    styleUrls: ['./messageManager.component.css']
})
export class MessageManagerComponent  implements OnInit {
    title = 'messageManager!';
    ftConfitService: FatigeConfigService;
    data: any[];
    channelTypeList: any[];
    templateFlagList: any[];
    templateTypeList: any[];

    constructor(ftConfitService: FatigeConfigService) {
        this.ftConfitService = ftConfitService;
    }

    ngOnInit(): void {
        console.log(this.title);
        this.initMsTemplateFlagEnumList();
        this.initMsTemplateTypeEnumList();
        this.initMsChannelTypeEnumList();
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

    filterResult(data): any {
        console.log('��ʼ���˴�������', data);

        if ('CAMP_OPERATE_SUCCESS' !== data.operateResult) {
            console.log('���ؽ��ʧ�ܣ�', data);
            return null;
        }
        return data.result;
    }
}
