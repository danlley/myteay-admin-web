import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {PxGoodsConfigModel} from '../../../model/goods';

declare let laydate;

@Component({
    selector: 'app-modify-goods',
    templateUrl: './modifyGoods.component.html',
    styleUrls: ['./modifyGoods.component.css']
})
export class ModifyGoodsComponent implements OnInit {
    title = '修改商品摘要!';
    ftConfitService: FatigeConfigService;
    goodsConfigModel = new PxGoodsConfigModel();

    shopData;
    orderType;
    isHuiyuan;
    isQuan;
    isTuan;

    goodsId;
    data;


    fileList;
    currentFile: File;
    fileName;
    errorMessage;
    isNeedUpload = false;

    constructor(ftConfitService: FatigeConfigService, private datePipe: DatePipe,
                private eventBus: EventService, private activeRoute: ActivatedRoute) {
        this.ftConfitService = ftConfitService;
    }

    ngOnInit(): void {
        console.log(this.title);
        this.initContactList();
        this.initShopData();
        this.initSingleGoods();

        laydate.render({
            elem: '#test1', // s为页面日期选择输入框的id
            type: 'datetime',
            theme: '#22787a',
            done: (value, date) => {
                this.goodsConfigModel.gmtExpired = value;
                console.log(value);
                console.log(date);
            }
        });
    }

    goReturn() {
        this.eventBus.publish('system_goods_manage_all', this.shopData);
    }

    private initSingleGoods() {
        const formData: FormData = new FormData();
        formData.append('goodsId', this.goodsId);
        formData.append('operationType', 'PX_QUERY_ONE');
        console.log('--formData--------------------------------->', this.goodsId);
        this.ftConfitService.manageGoodsConfig(formData).subscribe(res => {
            this.data = this.filterResult(res.json());
            this.goodsConfigModel.operationType = 'PX_MODIFY';
            this.goodsConfigModel.goodsId = this.data.goodsId;
            this.goodsConfigModel.goodsImage = this.data.goodsImage;
            this.goodsConfigModel.isHuiyuan = this.data.isHuiyuan;
            this.goodsConfigModel.isQuan = this.data.isQuan;
            this.goodsConfigModel.isTuan = this.data.isTuan;
            this.goodsConfigModel.gmtExpired = this.datePipe.transform(this.data.gmtExpired, 'yyyy-MM-dd HH:mm:ss');
            this.goodsConfigModel.goodsOnlineTime = this.data.goodsOnlineTime;
            this.goodsConfigModel.orderType = this.data.orderType;
            this.goodsConfigModel.goodsCommPrice = this.data.goodsCommPrice;
            this.goodsConfigModel.goodsPrice = this.data.goodsPrice;
            this.goodsConfigModel.goodsDesc = this.data.goodsDesc;
            this.goodsConfigModel.goodsTitle = this.data.goodsTitle;
            this.goodsConfigModel.gmtCreated = this.data.gmtCreated;
            this.goodsConfigModel.gmtModified = this.data.gmtModified;
            this.goodsConfigModel.goodsSellAmount = this.data.goodsSellAmount;
            this.goodsConfigModel.shopId = this.data.shopId;

            console.log('==goodsConfigModel---------------==>', this.goodsConfigModel);
        });
    }

    uploadFile($event) {
        this.errorMessage = '';
        this.fileList = $event.target.files;
        this.currentFile = this.fileList[0];
        this.fileName = this.currentFile.name;
        this.isNeedUpload = true;
    }

    modifyGoodsConfig() {
        const formData: FormData = new FormData();
        if (this.isNeedUpload) {
            formData.append('file', this.currentFile, this.currentFile.name);
        }
        this.goodsConfigModel.shopId = this.shopData[0];
        formData.append('goodsId', this.goodsId);
        console.log('----------------------------------->', this.goodsConfigModel);
        formData.append('shopId', this.goodsConfigModel.shopId);
        formData.append('goodsTitle', this.goodsConfigModel.goodsTitle);
        formData.append('goodsDesc', this.goodsConfigModel.goodsDesc);
        formData.append('goodsPrice', this.goodsConfigModel.goodsPrice);
        formData.append('goodsCommPrice', this.goodsConfigModel.goodsCommPrice);
        formData.append('goodsOnlineTime', this.goodsConfigModel.goodsOnlineTime);
        formData.append('orderType', this.goodsConfigModel.orderType);
        formData.append('isHuiyuan', this.goodsConfigModel.isHuiyuan);
        formData.append('isQuan', this.goodsConfigModel.isQuan);
        formData.append('isTuan', this.goodsConfigModel.isTuan);
        formData.append('operationType', 'PX_MODIFY');
        formData.append('gmtExpired', this.goodsConfigModel.gmtExpired);
        console.log('----------------------------------->', formData);
        this.ftConfitService.manageGoodsConfig(formData).subscribe(res => {
            console.log('=======================>', res.json());
            this.eventBus.publish('system_goods_manage_all', this.shopData);
        });
    }

    private initShopData() {
        const tmpData: string = this.activeRoute.snapshot.queryParams['data'];
        this.goodsId = this.activeRoute.snapshot.queryParams['id'];
        const tmpArr: string[] = tmpData.split(',');
        this.shopData = tmpArr;
        console.log('=====--------->', this.shopData);
    }

    initContactList() {
        this.ftConfitService.getDataDictionaryByKey('PxGoodsOrderTypeEnum').subscribe(res => {
            this.orderType = this.filterResult(res.json());
        });
        this.ftConfitService.getDataDictionaryByKey('PxGoodsHuiyuanEnum').subscribe(res => {
            this.isHuiyuan = this.filterResult(res.json());
        });
        this.ftConfitService.getDataDictionaryByKey('PxGoodsQuanEnum').subscribe(res => {
            this.isQuan = this.filterResult(res.json());
        });
        this.ftConfitService.getDataDictionaryByKey('PxGoodsTuanEnum').subscribe(res => {
            this.isTuan = this.filterResult(res.json());
        });
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
