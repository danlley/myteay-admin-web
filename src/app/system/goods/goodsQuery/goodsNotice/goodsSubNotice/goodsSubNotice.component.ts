import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FatigeConfigService} from '../../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {ActivatedRoute} from '@angular/router';
import {CommonServie} from '../../../../../utils/common.servie';
import {PxPackageSubNoticeModel} from '../../../../../model/goods';

@Component({
    selector: 'app-query-goods-packages-sub-notice',
    templateUrl: './goodsSubNotice.component.html',
    styleUrls: ['./goodsSubNotice.component.css']
})

/**
 * 温馨提醒子内容管理组件
 */
export class GoodsSubNoticeComponent implements OnInit {

    title = '温馨提醒子内容管理组件';

    // 温馨提醒数据，用于操作温馨提醒子内容
    @Input() noticeData;

    // 是否展示温馨提醒之内容的按钮
    @Input() isShowOperation = true;

    @Output() resultMessage: EventEmitter<SubNoticeResultMessage> = new EventEmitter();

    // 提醒子内容展示列表
    subNoticePackageDataList: PxPackageSubNoticeModel[];

    isNeedShowErrMsg = false;
    errMsg = '';

    /**
     * 组件构造
     *
     * @param {FatigeConfigService} ftConfitService
     * @param {CommonServie} commonService
     * @param {ActivatedRoute} activeRoute
     */
    constructor(private ftConfitService: FatigeConfigService,
                private commonService: CommonServie, public activeRoute: ActivatedRoute) {
    }

    /**
     * 组件初始
     */
    ngOnInit(): void {
        console.log('noticeData------------------>', this.noticeData);
        this.initSubNoticeList();
    }

    /**
     * 删除提醒子项
     *
     * @param elements
     */
    public doDeleteSubPackages(elements) {
        const subPackageData = new PxPackageSubNoticeModel();
        subPackageData.packagesSuNoticeId = elements.packagesSuNoticeId;
        subPackageData.operationType = 'PX_DELETE';
        console.log('=======================>', subPackageData);
        this.ftConfitService.managePackagesSubNotice(subPackageData).subscribe(res => {
            const result = this.commonService.filterResult(res);
            console.log('开始过滤处理结果：', result);
            const data = res;
            console.log('data-----------result---->', res);
            this.errMsg = '';
            if (data.operateResult !== 'CAMP_OPERATE_SUCCESS') {
                this.isNeedShowErrMsg = true;
                this.errMsg = '删除子提醒信息出错---------> 错误码:' + data.errorCode + '　　　　　　错误详情:' + data.errorDetail;
                const message = new SubNoticeResultMessage();
                message.isNeedShowErrMsg = this.isNeedShowErrMsg;
                message.errMsg = this.errMsg;
                this.resultMessage.emit(message);
            }
            this.initSubNoticeList();
        });
    }

    /**
     * 获取提醒子项列表信息
     */
    private initSubNoticeList() {
        // 子提醒
        if (this.noticeData === undefined) {
            console.log('当前温馨提醒分类信息不可用elements is null! ');
            return;
        }

        console.log('当前温馨提醒分类信息 ', this.noticeData);

        this.ftConfitService.getPackagesSubNotice(this.noticeData.packagesNoticeId).subscribe(e => {
            this.subNoticePackageDataList = this.commonService.filterResult(e);
        });
    }
}

export class SubNoticeResultMessage {
    isNeedShowErrMsg = false;
    errMsg = '';
}
