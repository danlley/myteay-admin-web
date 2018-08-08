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
export class GoodsDetailImageShowComponent implements OnInit {
    title = '商品摘要详情!';

    templateConfigList = [];
    templateNameList = [];
    @Input() formData = new PxGoodsConfigModel();


    constructor(private ftConfitService: FatigeConfigService, private commonService: CommonServie) {
    }

    ngOnInit(): void {
        console.log(this.title);
        this.queryImageListByGoodsId();
    }

    queryImageListByGoodsId() {
        this.templateConfigList = [];
        this.ftConfitService.getAllPackagesImageByGoodsId(this.formData.goodsId + '').subscribe(res => {
            const result = this.commonService.filterResult(res.json());
            if (result !== null) {
                result.forEach(e => {
                    this.templateConfigList.push(environment.PKG_IMG_SHOW_URL + e.image);
                    this.templateNameList.push(e.image);
                });
            }
        });

    }
}
