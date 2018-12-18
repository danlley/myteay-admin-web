import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {EventService} from '../../../asyncService/asyncService.service';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {PxGoodsConfigModel} from '../../../model/goods';
import {CommonServie} from '../../../utils/common.servie';

declare let laydate;

@Component({
    selector: 'app-modify-goods',
    templateUrl: './modifyGoods.component.html',
    styleUrls: ['./modifyGoods.component.css']
})

/**
 * 商品摘要修改组件
 */
export class ModifyGoodsComponent implements OnInit {
    title = '修改商品摘要';

    // 商品摘要模型，用于暂存待修改的商品摘要数据和历史商品摘要数据的展示
    goodsConfigModel = new PxGoodsConfigModel();

    // 店铺信息
    shopData;

    // 商品摘要修改表单所需的下拉列表数据
    orderType;
    isHuiyuan;
    isQuan;
    isTuan;
    goodsTypeOption;

    goodsId;
    data;


    fileList;
    currentFile: File;
    fileName;
    errorMessage;
    isNeedUpload = false;

    /**
     * 构建组件
     *
     * @param {FatigeConfigService} ftConfitService
     * @param {DatePipe} datePipe
     * @param {CommonServie} commonService
     * @param {EventService} eventBus
     * @param {ActivatedRoute} activeRoute
     */
    constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe, private commonService: CommonServie,
                private eventBus: EventService, private activeRoute: ActivatedRoute) {
    }

    /**
     * 初始化当前组件
     */
    ngOnInit(): void {
        console.log(this.title);
        this.initContactList();
        this.initShopData();
        this.initSingleGoods();

        // 初始化上传组件
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

    /**
     * 返回商品摘要列表页面
     */
    goReturn() {
        this.eventBus.publish('system_goods_manage_all', this.shopData);
    }

    /**
     * 商品摘要修改表单数据渲染
     */
    private initSingleGoods() {
        const formData: FormData = new FormData();
        formData.append('goodsId', this.goodsId);
        formData.append('operationType', 'PX_QUERY_ONE');
        console.log('--formData--------------------------------->', this.goodsId);
        this.ftConfitService.manageGoodsConfig(formData).subscribe(res => {
            this.data = this.commonService.filterResult(res.json());
            this.goodsConfigModel.operationType = 'PX_MODIFY';
            this.goodsConfigModel.goodsId = this.data.goodsId;
            this.goodsConfigModel.goodsImage = this.data.goodsImage;
            this.goodsConfigModel.isHuiyuan = this.data.isHuiyuan;
            this.goodsConfigModel.isQuan = this.data.isQuan;
            this.goodsConfigModel.isTuan = this.data.isTuan;
            this.goodsConfigModel.gmtExpired = this.datePipe.transform(this.data.gmtExpired, 'yyyy-MM-dd HH:mm:ss');
            this.goodsConfigModel.goodsOnlineTime = this.data.goodsOnlineTime;
            this.goodsConfigModel.orderType = this.data.orderType;
            this.goodsConfigModel.goodsType = this.data.goodsType;
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

    /**
     * 选择文件上传后的准备动作
     *
     * @param $event
     */
    uploadFile($event) {
        this.errorMessage = '';
        this.fileList = $event.target.files;
        this.currentFile = this.fileList[0];
        this.fileName = this.currentFile.name;
        this.isNeedUpload = true;
    }

    /**
     * 执行商品修改动作
     */
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
        formData.append('goodsType', this.goodsConfigModel.goodsType);
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

    /**
     * 初始化店铺及商品信息
     */
    private initShopData() {
        this.goodsId = this.activeRoute.snapshot.queryParams['id'];
        this.shopData = this.commonService.initShopData(this.activeRoute.snapshot.queryParams['data']);
        console.log('=====--------->', this.shopData);
    }

    /**
     * 初始化商品概要信息修改所需的各种下拉菜单选项
     */
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
        this.ftConfitService.getDataDictionaryByKey('PxGoodsTypeEnum').subscribe(res => {
            this.goodsTypeOption = this.commonService.filterResult(res.json());
        });
    }
}
