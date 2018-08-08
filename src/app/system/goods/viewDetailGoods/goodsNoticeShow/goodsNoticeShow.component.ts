import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {PxGoodsConfigModel, PxPackageNoticeModel} from '../../../../model/goods';
import {CommonServie} from '../../../../utils/common.servie';

@Component({
    selector: 'app-view-detail-goods-notice-show',
    templateUrl: './goodsNoticeShow.component.html',
    styleUrls: ['./goodsNoticeShow.component.css']
})

/**
 * 温馨提醒展示组件
 */
export class GoodsNoticeShowComponent implements OnInit {
    title = '温馨提醒展示';

    @Input() formData = new PxGoodsConfigModel();

    packagesNoticeList: PxPackageNoticeModel[] = [];

    /**
     * 构建组件
     *
     * @param {FatigeConfigService} ftConfitService
     * @param {DatePipe} datePipe
     * @param {CommonServie} commonService
     */
    constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe,
                private commonService: CommonServie) {
    }

    /**
     * 初始化组件
     */
    ngOnInit(): void {
        console.log(this.title);
        this.initGoodsNoticeList();
    }

    /**
     * 初始化提醒分类列表
     */
    initGoodsNoticeList() {
        // 套餐包
        this.ftConfitService.getAllPacakgesNoticeByGoodsId(this.formData.goodsId + '').subscribe(res => {
            this.packagesNoticeList = this.commonService.filterResult(res.json());
            console.log('packagesNoticeList：', this.packagesNoticeList);
        });
    }
}
