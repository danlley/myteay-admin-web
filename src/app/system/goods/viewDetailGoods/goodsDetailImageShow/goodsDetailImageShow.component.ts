import {Component, Input, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {environment} from '../../../../../environments/environment.prod';
import {PxGoodsConfigModel} from '../../../../model/goods';

@Component({
    selector: 'app-view-detail-goods-image-show',
    templateUrl: './goodsDetailImageShow.component.html',
    styleUrls: ['./goodsDetailImageShow.component.css']
})
export class GoodsDetailImageShowComponent implements OnInit {
    title = '商品摘要详情!';

    ftConfitService: FatigeConfigService;
    templateConfigList = [];
    templateNameList = [];
    @Input() formData = new PxGoodsConfigModel();


    constructor(ftConfitService: FatigeConfigService) {
        this.ftConfitService = ftConfitService;
    }

    ngOnInit(): void {
        console.log(this.title);
        this.queryImageListByGoodsId();
    }

    queryImageListByGoodsId() {
        this.templateConfigList = [];
        this.ftConfitService.getAllPackagesImageByGoodsId(this.formData.goodsId + '').subscribe(res => {
            const result = this.filterResult(res.json());
            if (result !== null) {
                result.forEach(e => {
                    this.templateConfigList.push(environment.PKG_IMG_SHOW_URL + e.image);
                    this.templateNameList.push(e.image);
                });
            }
        });

    }

    filterResult(data): any {
        if ('CAMP_OPERATE_SUCCESS' !== data.operateResult) {
            console.log('返回结果失败：', data);
            return null;
        }
        return data.result;
    }
}
