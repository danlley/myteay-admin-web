import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';

@Component({
    selector: 'app-modify-message-config',
    templateUrl: './modifyMessageConfig.component.html',
    styleUrls: ['./modifyMessageConfig.component.css']
})
export class ModifyMessageConfigComponent implements OnInit {
    title = 'modify message config!';
    ftConfitService: FatigeConfigService;
    data: any[];
    channelTypeList: any[];
    templateFlagList: any[];
    templateTypeList: any[];
    formData = new SubmitResultData();
    requestMessageConfigData = new MsTemplateConfigModel();

    constructor(ftConfitService: FatigeConfigService) {
        this.ftConfitService = ftConfitService;
    }

    ngOnInit(): void {
        console.log(this.title);
        this.initMsTemplateFlagEnumList();
        this.initMsTemplateTypeEnumList();
        this.initMsChannelTypeEnumList();
    }

    addNewMessageConfig() {
        this.requestMessageConfigData.channelType = this.formData.channelType;
        this.requestMessageConfigData.expireTime = this.formData.expireTime;
        this.requestMessageConfigData.templateDriverUrl = this.formData.templateDriverUrl;
        this.requestMessageConfigData.templateFlag = this.formData.templateFlag;
        this.requestMessageConfigData.templateType = this.formData.templateType;
        this.requestMessageConfigData.msTxtTemplateConfigModel.content = this.formData.content;

        this.requestMessageConfigData.operationType = 'MS_ADD';
        console.log('----------------------------------->', this.formData);
        this.ftConfitService.manageMessageConfigByParam(this.requestMessageConfigData).subscribe(res => {
            console.log('=======================>', res.json());
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

    filterResult(data): any {
        console.log('开始过滤处理结果：', data);

        if ('操作成功' !== data.operateResult) {
            console.log('返回结果失败：', data);
            return null;
        }
        return data.result;
    }

}

export class MsTemplateConfigModel {
    expireTime: number;
    channelType: string;
    templateFlag: string;
    templateType: string;
    templateDriverUrl: string;
    operationType: string;
    msTxtTemplateConfigModel = new MsTxtTemplateConfigModel();
}

export class MsTxtTemplateConfigModel {
    content: string;
}

export class SubmitResultData {
    expireTime: number;
    channelType: string;
    templateFlag: string;
    templateType: string;
    templateDriverUrl: string;
    content: string;
}
