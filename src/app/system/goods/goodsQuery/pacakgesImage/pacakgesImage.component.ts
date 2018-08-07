import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {FileUploader} from 'ng2-file-upload';
import {environment} from '../../../../../environments/environment.prod';

@Component({
    selector: 'app-query-goods',
    templateUrl: './pacakgesImage.component.html',
    styleUrls: ['./pacakgesImage.component.css']
})

export class PacakgesImageComponent implements OnInit {

    title = '套餐详情图片管理';
    shopData;
    goodsData;
    summaryTableElement: any[];
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

    private uploader: FileUploader = new FileUploader({
        url: environment.PKG_IMG_CONFIG_URL + this.goodsId,
        method: 'POST',
        itemAlias: 'file'
    });

    constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe,
                public activeRoute: ActivatedRoute, private eventBus: EventService) {

        this.eventBus.registerySubject('single_sub_packages_for_delete').subscribe(e => {
            console.log('表格操作目标（删除）：', e);
            // this.doDeleteSubPackages(e[0]);
        });
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
            this.templateConfigList = this.filterResult(res.json());
            this.queryImageListByGoodsId();
            this.fileName = '';
        });
    }

    queryImageListByGoodsId() {
        this.templateConfigList = [];
        this.ftConfitService.getAllPackagesImageByGoodsId(this.goodsId).subscribe(res => {
            const result = this.filterResult(res.json());
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
            const result = this.filterResult(res.json());
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

        this.constructSummaryTableData();
    }

    private constructSummaryTableData() {
        const goodsName: PxSummaryTableElement = new PxSummaryTableElement();
        goodsName.face = '商品名称';
        goodsName.value = this.goodsData[1];

        const name: PxSummaryTableElement = new PxSummaryTableElement();
        name.face = '店铺名称';
        name.value = this.shopData[1];

        const goodsType: PxSummaryTableElement = new PxSummaryTableElement();
        goodsType.face = '套餐类型';
        goodsType.value = this.goodsData[2];

        const price: PxSummaryTableElement = new PxSummaryTableElement();
        price.face = '当前售价';
        price.value = this.goodsData[3];

        const sellsAmount: PxSummaryTableElement = new PxSummaryTableElement();
        sellsAmount.face = '当前销量';
        sellsAmount.value = this.goodsData[4];

        const expired: PxSummaryTableElement = new PxSummaryTableElement();
        expired.face = '过期时间';
        expired.value = this.goodsData[5];

        this.summaryTableElement = [[name, goodsName, goodsType], [price, sellsAmount, expired]];
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

export class PxSummaryTableElement {
    face: string;
    value: string;
}


export class PxPackageImageModel {
    imageId;
    goodsId;
    image;
    imageShow;
    gmtCreated;
    gmtModified;
}
