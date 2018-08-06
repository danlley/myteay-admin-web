import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-query-goods-packages-sub-notice',
    templateUrl: './goodsSubNotice.component.html',
    styleUrls: ['./goodsSubNotice.component.css']
})

export class GoodsSubNoticeComponent implements OnInit {

    title = '套餐包管理!';

    @Input() noticeData;
    subNoticePackageDataList: PxPackageSubNoticeModel[] = [];

    constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe,
                public activeRoute: ActivatedRoute, private eventBus: EventService) {
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
            const result = this.filterResult(res.json());
            console.log('开始过滤处理结果：', result);
            this.initGoodsList();
        });
    }

    initGoodsList() {
        // 子提醒
        // this.ftConfitService.getPackagesSubNotice(this.noticeData.packagesNoticeId).subscribe(e => {
        //     this.subNoticePackageDataList = this.filterResult(e.json());
        //     if (this.subNoticePackageDataList !== null) {
        //         this.subNoticePackageDataList.forEach( res => {
        //             const temp = new PxPackageSubNoticeModel();
        //             temp.packagesSuNoticeId = res.packagesSuNoticeId;
        //             temp.packagesNoticeId = res.packagesNoticeId;
        //             temp.subNoticeDetail = res.subNoticeDetail;
        //             temp.gmtCreated = this.datePipe.transform(res.gmtCreated, 'yyyy-MM-dd hh:mm:ss');
        //             temp.gmtModified = this.datePipe.transform(res.gmtModified, 'yyyy-MM-dd hh:mm:ss');
        //             this.subNoticePackageDataList.push(temp);
        //         });
        //     }
        // });
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


export class PxPackageNoticeModel {
    packagesNoticeId: string;
    operationType = 'PX_ADD';
    goodsId: string;
    packagesNoticeName: string;
    gmtCreated: string;
    gmtModified: string;
}

export class PxPackageSubNoticeModel {
    packagesNoticeId: string;
    operationType = 'PX_ADD';
    packagesSuNoticeId: string;
    subNoticeDetail: string;
    gmtCreated: string;
    gmtModified: string;
}

