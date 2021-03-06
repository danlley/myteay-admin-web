import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from '../../../../customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {DatePipe} from '@angular/common';
import {CommonServie} from '../../../../utils/common.servie';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../../../asyncService/asyncService.service';
import {CampPrizeStatusEnum} from '../../../../commons/enums/CampPrizeStatusEnum';

@Component({
  selector: 'app-camp-shop-single-prize-mng',
  templateUrl: './campSingleShopPrizeMng.component.html',
  styleUrls: ['./campSingleShopPrizeMng.component.css']
})

/**
 * 店铺内营销活动奖品管理组件
 */
export class CampSingleShopPrizeMngComponent implements OnInit {
  title = '店内营销活动奖品管理!';
  templateConfigList: any[];

  // 店铺信息，用于构建页面店铺信息展示
  shopData;
  campData;
  campPrizeModel: CampPrizeModel = new CampPrizeModel();

  isNeedShowErrMsg = false;
  errMsg = '';

  campId = '';
  shopId = '';

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
  constructor(private ftConfitService: FatigeConfigService, private datePipe: DatePipe, private campPrizeStatusEnum: CampPrizeStatusEnum,
              private commonService: CommonServie, private activeRoute: ActivatedRoute, private eventBus: EventService) {
    // 监听店内营销活动奖品删除请求
    this.eventBus.registerySubject('single_shop_camp_prize_delete').subscribe(e => {
      this.doDeleteSingleShopCampPrize(e.prizeId);
    });

    // 监听店内营销活动奖品上架请求
    this.eventBus.registerySubject('single_shop_camp_prize_online').subscribe(e => {
      this.doOnlineSingleShopCampPrize(e.prizeId);
    });

    // 监听店内营销活动奖品下架请求
    this.eventBus.registerySubject('single_shop_camp_prize_offline').subscribe(e => {
      this.doOfflineSingleShopCampPrize(e.prizeId);
    });

    // 监听店内营销活动奖品详情查看请求
    this.eventBus.registerySubject('campaign_shop_single_prize_view_detail_inner').subscribe(e => {
      const sendData = [this.shopData, e.prizeId];
      console.log('表格操作目标（详情）：', sendData);
      this.eventBus.publish('campaign_shop_single_prize_view_detail', sendData);
    });

    // 监听店内营销活动奖品下架请求
    this.eventBus.registerySubject('campaign_shop_single_prize_ref_inner').subscribe(e => {
      const sendData = [this.shopData, e.prizeId];
      console.log('表格操作目标（详情）：', sendData);
      this.eventBus.publish('campaign_shop_single_prize_ref', sendData);
    });
  }

  /**
   * 初始化组件
   */
  ngOnInit(): void {
    // 初始化店铺信息
    this.shopData = this.activeRoute.snapshot.queryParams['data'][0].split(',');
    this.campData = this.activeRoute.snapshot.queryParams['data'][1].split(',');

    console.log(this.campData);
    this.campId = this.campData[0];
    this.shopId = this.shopData[0];

    this.initCampPrizeList();
  }

  /**
   * 构建店内营销活动列表，用于进入店铺进行相应的店内营销活动管理
   */
  initCampPrizeList() {
    this.tableElement = {
      'tableHeaders': [],
      'tableOp': [['下架', 'single_shop_camp_prize_offline'],
        ['删除', 'single_shop_camp_prize_delete'],
        ['上架', 'single_shop_camp_prize_online'],
        ['查看', 'campaign_shop_single_prize_view_detail_inner'],
        ['关联商品', 'campaign_shop_single_prize_ref_inner']],
      'tableContent': []
    };
    this.ftConfitService.getShopAllCampPrizeConfig(this.campId).subscribe(res => {
      console.log('this.campId----------', this.campId);
      console.log('this.campId----------', res);
      this.templateConfigList = this.commonService.filterResult(res);
      this.tableElement.tableHeaders = ['奖品ID', '奖品名称', '奖品等级', '奖品比率', '奖品单位价值', '奖位分布', '奖品状态', '出奖限制'];
      if (this.templateConfigList !== null && this.templateConfigList !== undefined && this.templateConfigList.length !== 0) {
        this.templateConfigList.forEach(e => {
          const campPrizeStatus = this.getPrizeStatusSwitchShow(e.prizeStatus);
          e.prizeStatusShow = campPrizeStatus;
          e.showStatus = false;
        });
      }
    });
  }

  changeShowStatus(tableContentElement) {

    if (tableContentElement.prizeStatus !== 'CAMP_PRIZE_ONLINE') {
      tableContentElement.showStatus = !tableContentElement.showStatus;
    }
  }

  /**
   * 向外发布异步事件，确保当前表格组件的引入者能够完成其目标动作
   *
   * @param currentTableElement   当前表格行中数据
   * @param operation             目标操作类型（VIEW_DETAIL, MODIFY_DETAIL, DELETE_DETAIL）
   */
  tableNoPaginatorOperation(currentTableElement, operation) {
    console.log('执行查询动作：  this.campData=' , currentTableElement);
    this.eventBus.publish(operation, currentTableElement);
  }

  modifyPrizeInfo(campPrizeModel) {
    campPrizeModel.showStatus = false;
    campPrizeModel.operationType = 'PX_MODIFY';
    this.ftConfitService.manageCampPrizeConfig(campPrizeModel).subscribe(res => {
      console.log('=======================>', res);
      this.errMsg = '';
      const data = res;
      if (data.operateResult !== 'CAMP_OPERATE_SUCCESS') {
        this.isNeedShowErrMsg = true;
        this.errMsg = '奖品执行‘上架’出错---------> 错误码:' + data.errorCode + '　　　　　　错误详情:' + data.errorDetail;
      }
      this.initCampPrizeList();
    });
  }

  /**
   * 转换店内营销活动状态码为对应的店内营销活动状态值
   *
   * @param {string} campPrizeStatus
   * @returns {string}
   */
  private getPrizeStatusSwitchShow(campPrizeStatus: string): string {

    let prizeStatusShow = '';
    this.campPrizeStatusEnum.values.forEach(e => {
      if (e[0] === campPrizeStatus) {
        prizeStatusShow = e[1];
      }
    });

    return prizeStatusShow;
  }


  /**
   * 刷新当前营销活动列表
   */
  doQuery() {
    this.isNeedShowErrMsg = false;
    this.errMsg = '';

    this.initCampPrizeList();
  }

  /**
   * 返回店铺列表页面
   */
  goReturn() {
    const data = [];
    let i = 0;
    this.shopData.forEach(e => {
      if (i < 7) {
        data.push(e);
        i++;
      }
    });
    this.eventBus.publish('campaign_shop_single', data);
  }

  /**
   * 进入奖品添加页面
   */
  gotoAddCampPrize() {
    this.eventBus.publish('campaign_shop_single_prize_add', [this.shopData, this.campData]);
  }

  /**
   * 删除奖品
   */
  doDeleteSingleShopCampPrize(prizeId) {
    console.log('this.campPrizeModel------------------------->', this.campPrizeModel);
    this.campPrizeModel.operationType = 'PX_DELETE';
    this.campPrizeModel.prizeId = prizeId;
    this.ftConfitService.manageCampPrizeConfig(this.campPrizeModel).subscribe(res => {
      console.log('=======================>', res);
      this.errMsg = '';
      const data = res;
      if (data.operateResult !== 'CAMP_OPERATE_SUCCESS') {
        this.isNeedShowErrMsg = true;
        this.errMsg = '奖品执行‘删除’出错---------> 错误码:' + data.errorCode + '　　　　　　错误详情:' + data.errorDetail;
      }
      this.initCampPrizeList();
    });
  }

  /**
   * 上架奖品
   */
  doOnlineSingleShopCampPrize(prizeId) {
    console.log('this.campPrizeModel------------------------->', this.campPrizeModel);
    this.campPrizeModel.operationType = 'PX_MODIFY';
    this.campPrizeModel.prizeId = prizeId;
    this.campPrizeModel.prizeStatus = 'CAMP_PRIZE_ONLINE';
    this.ftConfitService.manageCampPrizeConfig(this.campPrizeModel).subscribe(res => {
      console.log('=======================>', res);
      this.errMsg = '';
      const data = res;
      if (data.operateResult !== 'CAMP_OPERATE_SUCCESS') {
        this.isNeedShowErrMsg = true;
        this.errMsg = '奖品执行‘上架’出错---------> 错误码:' + data.errorCode + '　　　　　　错误详情:' + data.errorDetail;
      }
      this.initCampPrizeList();
    });
  }

  /**
   * 下架奖品
   */
  doOfflineSingleShopCampPrize(prizeId) {
    console.log('this.campPrizeModel------------------------->', this.campPrizeModel);
    this.campPrizeModel.operationType = 'PX_MODIFY';
    this.campPrizeModel.prizeId = prizeId;
    this.campPrizeModel.prizeStatus = 'CAMP_PRIZE_OFFLINE';
    this.ftConfitService.manageCampPrizeConfig(this.campPrizeModel).subscribe(res => {
      console.log('=======================>', res);
      this.errMsg = '';
      const data = res;
      if (data.operateResult !== 'CAMP_OPERATE_SUCCESS') {
        this.isNeedShowErrMsg = true;
        this.errMsg = '奖品执行‘下架’出错---------> 错误码:' + data.errorCode + '　　　　　　错误详情:' + data.errorDetail;
      }
      this.initCampPrizeList();
    });
  }

}

export class CampPrizeModel {
  prizeId: string;
  prizeName: string;
  campId: string;
  shopId: string;
  prizeLevel: string;
  prizePercent: string;
  distribution: string;
  price: string;
  prizeAmount: string;
  prizeStatus = 'CAMP_PRIZE_DRAFT';
  prizeEffictive: string;
  prizeExpired: string;
  operationType = 'PX_ADD';
}
