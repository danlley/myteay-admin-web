import {Component, Input, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {ActivatedRoute} from '@angular/router';
import {CommonServie} from '../../../../../utils/common.servie';

@Component({
    selector: 'app-query-goods-packages-sub-notice',
    templateUrl: './goodsSubNotice.component.html',
    styleUrls: ['./goodsSubNotice.component.css']
})

export class GoodsSubNoticeComponent implements OnInit {

    title = '套餐包管理!';

    @Input() noticeData;

    @Input() isShowOperation = true;
    subNoticePackageDataList: PxPackageSubNoticeModel[];
    height = 0;

    constructor(private ftConfitService: FatigeConfigService,
                private commonService: CommonServie, public activeRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        console.log('noticeData------------------>', this.noticeData);
        this.initGoodsList();
    }

    doDeleteSubPackages(elements) {
        const subPackageData = new PxPackageSubNoticeModel();
        subPackageData.packagesSuNoticeId = elements.packagesSuNoticeId;
        subPackageData.operationType = 'PX_DELETE';
        console.log('=======================>', subPackageData);
        this.ftConfitService.managePackagesSubNotice(subPackageData).subscribe(res => {
            const result = this.commonService.filterResult(res.json());
            console.log('开始过滤处理结果：', result);
            this.initGoodsList();
        });
    }

    initGoodsList() {
        // 子提醒
        if (this.noticeData === undefined) {
            console.log('当前温馨提醒分类信息不可用elements is null! ');
            return;
        }

        console.log('当前温馨提醒分类信息 ', this.noticeData);

        this.ftConfitService.getPackagesSubNotice(this.noticeData.packagesNoticeId).subscribe(e => {
            this.subNoticePackageDataList = this.commonService.filterResult(e.json());
        });
    }
}

export class PxPackageSubNoticeModel {
    packagesNoticeId: string;
    operationType = 'PX_ADD';
    packagesSuNoticeId: string;
    subNoticeDetail: string;
    gmtCreated: string;
    gmtModified: string;
}

