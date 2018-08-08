import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {PxGoodsConfigModel} from '../../../model/goods';
import {CommonServie} from '../../../utils/common.servie';

declare let laydate;

@Component({
    selector: 'app-add-goods',
    templateUrl: './addGoods.component.html',
    styleUrls: ['./addGoods.component.css']
})
export class AddGoodsComponent implements OnInit {
    title = '添加商品摘要!';
    goodsConfigModel = new PxGoodsConfigModel();

    shopData;

    orderType;
    isHuiyuan;
    isQuan;
    isTuan;

    fileList;
    currentFile: File;
    fileName;
    errorMessage;

    constructor(private ftConfitService: FatigeConfigService, private eventBus: EventService,
                private commonService: CommonServie, private activeRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        console.log(this.title);
        this.initContactList();
        this.initShopData();

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

    uploadFile($event) {
        this.errorMessage = '';
        this.fileList = $event.target.files;
        this.currentFile = this.fileList[0];
        this.fileName = this.currentFile.name;
    }

    addNewGoodsConfig() {
        const formData: FormData = new FormData();
        formData.append('file', this.currentFile, this.currentFile.name);
        this.goodsConfigModel.shopId = this.shopData[0];
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
        formData.append('operationType', 'PX_ADD');
        formData.append('gmtExpired', this.goodsConfigModel.gmtExpired);
        this.ftConfitService.manageGoodsConfig(formData).subscribe(res => {
            console.log('=======================>', res.json());
            this.eventBus.publish('system_goods_manage_all', this.shopData);
        });
    }

    private initShopData() {
        const tmpData: string = this.activeRoute.snapshot.queryParams['data'];
        const tmpArr: string[] = tmpData.split(',');
        this.shopData = tmpArr;
        console.log('=====--------->', this.shopData);
    }

    initContactList() {
        this.ftConfitService.getDataDictionaryByKey('PxGoodsOrderTypeEnum').subscribe(res => {
            this.orderType = this.commonService.filterResult(res.json());
        });
        this.ftConfitService.getDataDictionaryByKey('PxGoodsHuiyuanEnum').subscribe(res => {
            this.isHuiyuan = this.commonService.filterResult(res.json());
        });
        this.ftConfitService.getDataDictionaryByKey('PxGoodsQuanEnum').subscribe(res => {
            this.isQuan = this.commonService.filterResult(res.json());
        });
        this.ftConfitService.getDataDictionaryByKey('PxGoodsTuanEnum').subscribe(res => {
            this.isTuan = this.commonService.filterResult(res.json());
        });
    }


}
