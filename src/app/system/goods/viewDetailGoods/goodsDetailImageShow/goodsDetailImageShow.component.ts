import {Component, Input, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {environment} from '../../../../../environments/environment.prod';
import {PxGoodsConfigModel} from '../../../../model/goods';
import {CommonServie} from '../../../../utils/common.servie';

@Component({
    selector: 'app-view-detail-goods-image-show',
    templateUrl: './goodsDetailImageShow.component.html',
    styleUrls: ['./goodsDetailImageShow.component.css']
})

/**
 * 商品详情图片展示组件
 */
export class GoodsDetailImageShowComponent implements OnInit {
    title = '商品详情图片展示组件';

    templateConfigList = [];
    templateNameList = [];
    @Input() formData = new PxGoodsConfigModel();

    /**
     * 构建组件
     *
     * @param {FatigeConfigService} ftConfitService
     * @param {CommonServie} commonService
     */
    constructor(private ftConfitService: FatigeConfigService, private commonService: CommonServie) {
    }

    /**
     * 初始化当前组件
     */
    ngOnInit(): void {
        console.log(this.title);
        this.queryImageListByGoodsId();
    }

    /**
     * 查询当前商品对应的详情图片列表
     */
    queryImageListByGoodsId() {
        this.templateConfigList = [];
        this.ftConfitService.getAllPackagesImageByGoodsId(this.formData.goodsId + '').subscribe(res => {
            const result = this.commonService.filterResult(res);
            if (result !== null) {
                result.forEach(e => {
                    this.templateConfigList.push(environment.PKG_IMG_SHOW_URL + e.image);
                    this.templateNameList.push(e.image);
                });
            }
        });
    }
}
