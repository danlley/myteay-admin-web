import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../../environments/environment.prod';
import {CommonServie} from '../../../../utils/common.servie';

@Component({
    selector: 'app-query-goods',
    templateUrl: './pacakgesImage.component.html',
    styleUrls: ['./pacakgesImage.component.css']
})

export class PacakgesImageComponent implements OnInit {

    title = '套餐详情图片管理';
    shopData;
    goodsData;
    goodsId;
    goodsPackagesDetailNameModified;
    isNeedShowSubPackagesAdd = false;
    templateConfigList: any[];
    myFile: File;

    tableElement = {
        'tableHeaders': [],
        'tableOp': [],
        'tableContent': []
    };

    fileList;
    currentFile: File;
    fileName;
    errorMessage;

    constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe,
                private commonService: CommonServie, public activeRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.initShopData();
        this.queryImageListByGoodsId();
    }

    uploadFile($event) {
        this.errorMessage = '';
        this.fileList = $event.target.files;
        this.currentFile = this.fileList[0];
        this.fileName = this.currentFile.name;
    }

    doUploadFile() {
        const formData: FormData = new FormData();
        formData.append('file', this.currentFile, this.currentFile.name);
        this.ftConfitService.managePackagesImage(formData, this.goodsId).subscribe(res => {
            this.templateConfigList = this.commonService.filterResult(res.json());
            this.queryImageListByGoodsId();
            this.fileName = '';
        });
    }

    queryImageListByGoodsId() {
        this.templateConfigList = [];
        this.ftConfitService.getAllPackagesImageByGoodsId(this.goodsId).subscribe(res => {
            const result = this.commonService.filterResult(res.json());
            if (result !== null) {
                result.forEach(e => {
                    const gmtCreated = this.datePipe.transform(e.gmtCreated, 'yyyy-MM-dd HH:mm:ss');
                    const gmtModified = this.datePipe.transform(e.gmtModified, 'yyyy-MM-dd HH:mm:ss');
                    const data = new PxPackageImageModel();
                    data.goodsId = e.goodsId;
                    data.imageId = e.imageId;
                    data.image = e.image;
                    data.gmtCreated = gmtCreated;
                    data.gmtModified = gmtModified;
                    data.imageShow = environment.PKG_IMG_SHOW_URL + e.image;
                    console.log('data==========--->', data);
                    console.log('e==========--->', e);
                    this.templateConfigList.push(data);
                });
            }
        });

    }

    doOperation(element) {
        this.ftConfitService.removePackagesImage(element.imageId).subscribe(res => {
            const result = this.commonService.filterResult(res.json());
            console.log('=====--------->', result);
            this.queryImageListByGoodsId();
        });
    }

    private initShopData() {
        const tmpData: string = this.activeRoute.snapshot.queryParams['shop'];
        const tmpArr: string[] = tmpData.split(',');
        this.shopData = tmpArr;
        console.log('=====--------->', this.shopData);

        const tmpGoodsData: string = this.activeRoute.snapshot.queryParams['goods'];
        const tmpGoodsArr: string[] = tmpGoodsData.split(',');
        this.goodsData = tmpGoodsArr;
        this.goodsId = this.goodsData[0];
        console.log('=====--------->', this.goodsData);

    }

}

export class PxPackageImageModel {
    imageId;
    goodsId;
    image;
    imageShow;
    gmtCreated;
    gmtModified;
}
