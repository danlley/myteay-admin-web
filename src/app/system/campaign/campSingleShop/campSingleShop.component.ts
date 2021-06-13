import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {DatePipe} from '@angular/common';
import {CommonServie} from '../../../utils/common.servie';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../../asyncService/asyncService.service';

declare let laydate;

@Component({
  selector: 'app-camp-shop-single',
  templateUrl: './campSingleShop.component.html',
  styleUrls: ['./campSingleShop.component.css']
})

/**
 * 店铺内营销活动管理组件
 */
export class CampSingleShopComponent implements OnInit {
  title = '店内营销活动管理!';
  campStatusList: any[];
  templateConfigList: any[];

  // 店铺信息，用于构建页面店铺信息展示
  shopData;
  campBaseModel: CampBaseModel = new CampBaseModel();

  isNeedShowErrMsg = false;
  errMsg = '';

  tableElement = {
    'tableHeaders': [],
    'tableOp': [],
    'tableContent': []
  };

  /**
   * 构建组件
   *
   * @param {FatigeConfigService} ftConfitService
   * @param {DatePipe} datePipe
   * @param {CommonServie} commonService
   */
  constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe,
              private commonService: CommonServie, private activeRoute: ActivatedRoute, private eventBus: EventService) {
    // 监听店内营销活动删除请求
    this.eventBus.registerySubject('single_shop_camp_delete').subscribe(e => {
      this.gotoDeleteCampBase(e[0]);
    });

    // 监听店内营销活动关闭请求
    this.eventBus.registerySubject('single_shop_camp_shutdown').subscribe(e => {
      this.gotoChangeCampBaseStatus(e[0], 'CAMP_OFFLINE');
    });

    // 监听店内营销活动启动请求
    this.eventBus.registerySubject('single_shop_camp_start').subscribe(e => {
      this.gotoChangeCampBaseStatus(e[0], 'CAMP_ONLINE');
    });

    // 监听店内营销活动启动请求
    this.eventBus.registerySubject('camp_shop_single_setting').subscribe(e => {
      this.gotoSetShopCampConfig(e[0], e[7]);
    });

  }

  /**
   * 初始化组件
   */
  ngOnInit(): void {
    console.log('this.activeRoute.snapshot.queryParams.data', this.activeRoute.snapshot.queryParams['data']);

    // 初始化店铺信息
    this.shopData = this.activeRoute.snapshot.queryParams['data'];

    // 监听店内营销活动奖品上架请求
    this.eventBus.registerySubject('campaign_shop_prize_single_prize_mng').subscribe(e => {
      const sendData = [this.shopData, e];
      console.log('表格操作目标（详情）：', sendData);
      this.eventBus.publish('campaign_shop_single_prize_mng', sendData);
    });

    this.initCampStatusList();
    this.initCampBaseList();

    // 初始化日期选择组件
    laydate.render({
      elem: '#test1', // s为页面日期选择输入框的id
      type: 'datetime',
      theme: '#22787a',
      done: (value, date) => {
        this.campBaseModel.campStart = value;
        console.log(value);
        console.log(date);
      }
    });

    // 初始化日期选择组件
    laydate.render({
      elem: '#test2', // s为页面日期选择输入框的id
      type: 'datetime',
      theme: '#22787a',
      done: (value, date) => {
        this.campBaseModel.campEnd = value;
        console.log(value);
        console.log(date);
      }
    });
  }

  private gotoSetShopCampConfig(campId: string, campStatus: string): void {
    this.isNeedShowErrMsg = false;
    this.errMsg = '';
    const shopId = this.shopData[0];
    console.log('', shopId + '  ----  ' + campId);

    const campConfigArray: string[] = ['CAMP_ONLINE', 'CAMP_OFFLINE', 'CAMP_EXPIRED'];

    const tcShopCampConfigModel: TcShopCampConfigModel = new TcShopCampConfigModel();
    tcShopCampConfigModel.shopId = shopId;
    tcShopCampConfigModel.campId = campId;
    tcShopCampConfigModel.operator = 'N/A';

    let campConfigFlag = null;
    campConfigArray.forEach(e => {
      if (e === campStatus) {
        campConfigFlag = e;
      }
    });

    if (campConfigFlag === null) {
      console.log('营销活动状态不可用，无法对指定店铺进行设置', campId);
      this.isNeedShowErrMsg = true;
      this.errMsg = '营销活动状态不可用，无法对指定店铺进行设置';
      return;
    }

    tcShopCampConfigModel.campConfigFlag = campConfigFlag;
    this.ftConfitService.manageShopCampConfig(tcShopCampConfigModel).subscribe(res => {
      console.log('=======================>', res);
      this.errMsg = '';
      const data = res;
      if (data.operateResult !== 'CAMP_OPERATE_SUCCESS') {
        this.isNeedShowErrMsg = true;
        this.errMsg = '店内营销活动执行‘' + campStatus + '’出错---------> 错误码:' + data.errorCode + '　　　　　　错误详情:' + data.errorDetail;
      }
    });
  }

  /**
   * 变更营销活动状态
   *
   * @param {string} campId
   */
  gotoChangeCampBaseStatus(campId: string, campStatus: string) {
    const campBaseModel: CampBaseModel = new CampBaseModel();
    campBaseModel.shopId = this.shopData[0];
    campBaseModel.shopName = this.shopData[1];
    campBaseModel.campId = campId;
    campBaseModel.campStatus = campStatus;
    console.log('----------------------------------->', this.campBaseModel);
    campBaseModel.operationType = 'PX_MODIFY';
    this.ftConfitService.manageCampBaseConfig(campBaseModel).subscribe(res => {
      console.log('=======================>', res);
      this.doQuery();
      this.errMsg = '';
      const data = res;
      if (data.operateResult !== 'CAMP_OPERATE_SUCCESS') {
        this.isNeedShowErrMsg = true;
        this.errMsg = '店内营销活动执行‘' + campStatus + '’出错---------> 错误码:' + data.errorCode + '　　　　　　错误详情:' + data.errorDetail;
      }
    });

  }

  /**
   * 删除营销活动
   *
   * @param {string} campId
   */
  gotoDeleteCampBase(campId: string) {
    const campBaseModel: CampBaseModel = new CampBaseModel();
    campBaseModel.shopId = this.shopData[0];
    campBaseModel.shopName = this.shopData[1];
    campBaseModel.campId = campId;
    console.log('----------------------------------->', this.campBaseModel);
    console.log('----------------------------------->', this.shopData);
    campBaseModel.operationType = 'PX_DELETE';
    this.ftConfitService.manageCampBaseConfig(campBaseModel).subscribe(res => {
      console.log('=======================>', res);
      this.doQuery();
      this.errMsg = '';
      const data = res;
      if (data.operateResult !== 'CAMP_OPERATE_SUCCESS') {
        this.isNeedShowErrMsg = true;
        this.errMsg = '店内营销活动执行‘删除’操作出错---------> 错误码:' + data.errorCode + '　　　　　　错误详情:' + data.errorDetail;
      }
    });
  }

  /**
   * 新增营销活动
   */
  gotoAddCampBase() {
    this.campBaseModel.shopId = this.shopData[0];
    this.campBaseModel.shopName = this.shopData[1];
    console.log('----------------------------------->', this.campBaseModel);
    this.campBaseModel.operationType = 'PX_ADD';
    this.ftConfitService.manageCampBaseConfig(this.campBaseModel).subscribe(res => {
      console.log('=======================>', res);
      this.doQuery();
    });
  }

  /**
   * 构建店内营销活动列表，用于进入店铺进行相应的店内营销活动管理
   */
  initCampBaseList() {
    this.tableElement = {
      'tableHeaders': [],
      'tableOp': [['停止', 'single_shop_camp_shutdown'],
        ['删除', 'single_shop_camp_delete'],
        ['启动', 'single_shop_camp_start'],
        ['查看', 'camp_shop_single_view'],
        ['奖品管理', 'campaign_shop_prize_single_prize_mng'],
        ['店铺活动', 'camp_shop_single_setting']
      ],
      'tableContent': []
    };
    this.ftConfitService.getShopAllCampBaseConfig(this.shopData[0]).subscribe(res => {
      this.templateConfigList = this.commonService.filterResult(res);
      this.tableElement.tableHeaders = ['活动ID', '活动名称', '活动开始时间', '活动结束时间', '活动状态', '创建时间', '修改时间'];
      if (this.templateConfigList !== null && this.templateConfigList !== undefined && this.templateConfigList.length !== 0) {
        this.templateConfigList.forEach(e => {
          const gmtCreated = this.datePipe.transform(e.gmtCreated, 'yyyy-MM-dd HH:mm:ss');
          const gmtModified = this.datePipe.transform(e.gmtModified, 'yyyy-MM-dd HH:mm:ss');
          const campStart = this.datePipe.transform(e.campStart, 'yyyy-MM-dd HH:mm:ss');
          const campEnd = this.datePipe.transform(e.campEnd, 'yyyy-MM-dd HH:mm:ss');
          const campStatus = this.getCampSwitchShow(e.campStatus);
          this.tableElement.tableContent.push([e.campId, e.campName, campStart, campEnd,
            campStatus, gmtCreated, gmtModified, e.campStatus]);
        });
      }
    });
  }

  /**
   * 转换店内营销活动状态码为对应的店内营销活动状态值
   *
   * @param {string} campStatus
   * @returns {string}
   */
  private getCampSwitchShow(campStatus: string): string {
    if (this.campStatusList === null) {
      return '';
    }

    let campStatusActural = '';
    this.campStatusList.forEach(e => {
      if (e.bizKey === campStatus) {
        campStatusActural = e.value;
      }
    });

    return campStatusActural;
  }

  initCampStatusList() {
    this.ftConfitService.getDataDictionaryByKey('CampStatusEnum').subscribe(res => {
      this.campStatusList = this.commonService.filterResult(res);
    });
  }

  /**
   * 刷新当前营销活动列表
   */
  doQuery() {
    this.initCampBaseList();
  }

  /**
   * 返回店铺列表页面
   */
  goReturn() {
    this.eventBus.publish('campaign_shop', this.shopData);
  }
}

export class CampBaseModel {
  campId: string;
  campName: string;
  shopId: string;
  shopName: string;
  campStatus = 'CAMP_DRAFT';
  campStart: string;
  campEnd: string;
  operationType = 'PX_ADD';
}

export class TcShopCampConfigModel {
  shopId: string;
  campId: string;
  campConfigFlag: string;
  operator: string;
}
