import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../../environments/environment.prod';
import {CommonServie} from '../../../../utils/common.servie';
import {PxPackageImageModel} from '../../../../model/goods';
import {EventService} from '../../../../asyncService/asyncService.service';

@Component({
    selector: 'app-query-goods-package-image',
    templateUrl: './pacakgesImage.component.html',
    styleUrls: ['./pacakgesImage.component.css']
})

/**
 * 套餐包详情图片管理组件
 */
export class PacakgesImageComponent implements OnInit {

    title = '套餐详情图片管理';

    // 店铺及商品信息
    shopData;
    goodsData;
    goodsId;

    //
    packageImageList: any[];
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

    isNeedShowErrMsg = false;
    errMsg = '';

    /**
     * 构建组件
     *
     * @param {FatigeConfigService} ftConfitService
     * @param {DatePipe} datePipe
     * @param {CommonServie} commonService
     * @param {ActivatedRoute} activeRoute
     */
    constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe,  private eventBus: EventService,
                private commonService: CommonServie, public activeRoute: ActivatedRoute) {
    }

    /**
     * 初始化当前组件
     */
    ngOnInit(): void {
        this.initShopData();
        this.queryImageListByGoodsId();
    }

    /**
     * 选择上传文件后的处理动作
     *
     * @param $event
     */
    uploadFile($event) {
        this.errorMessage = '';
        this.fileList = $event.target.files;
        this.currentFile = this.fileList[0];
        this.fileName = this.currentFile.name;
    }

    /**
     * 执行文件上传动作
     */
    doUploadFile() {
        const formData: FormData = new FormData();
        formData.append('file', this.currentFile, this.currentFile.name);
        this.ftConfitService.managePackagesImage(formData, this.goodsId).subscribe(res => {
            this.packageImageList = this.commonService.filterResult(res.json());
            const data = res.json();
            this.errMsg = '';
            if (data.operateResult !== 'CAMP_OPERATE_SUCCESS') {
                this.isNeedShowErrMsg = true;
                this.errMsg = '追加图片信息出错---------> 错误码:' + data.errorCode + '　　　　　　错误详情:' + data.errorDetail;
            }
            this.queryImageListByGoodsId();
            this.fileName = '';
        });
    }

    /**
     * 查询当前商品下的所有详情图片
     */
    queryImageListByGoodsId() {
        this.packageImageList = [];
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
                    this.packageImageList.push(data);
                });
            }
        });

    }

    /**
     * 返回商品摘要列表页面
     */
    goReturn() {
        this.eventBus.publish('system_goods_manage_all', this.shopData);
    }

    /**
     * 图片删除动作
     *
     * @param element
     */
    doOperation(element) {
        this.ftConfitService.removePackagesImage(element.imageId).subscribe(res => {
            const result = this.commonService.filterResult(res.json());
            console.log('=====--------->', result);
            const data = res.json();
            this.errMsg = '';
            if (data.operateResult !== 'CAMP_OPERATE_SUCCESS') {
                this.isNeedShowErrMsg = true;
                this.errMsg = '删除商品出错---------> 错误码:' + data.errorCode + '　　　　　　错误详情:' + data.errorDetail;
            }
            this.queryImageListByGoodsId();
        });
    }

    /**
     * 初始化店铺及商品信息
     */
    private initShopData() {
        this.shopData = this.commonService.initShopData(this.activeRoute.snapshot.queryParams['shop']);
        console.log('=====--------->', this.shopData);

        this.goodsData = this.commonService.initShopData(this.activeRoute.snapshot.queryParams['goods']);
        this.goodsId = this.goodsData[0];
        console.log('=====--------->', this.goodsData);

    }

}
