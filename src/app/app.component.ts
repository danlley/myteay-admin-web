import {Component, OnInit} from '@angular/core';
import {EventService} from './asyncService/asyncService.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'app works!';

    constructor(private eventBus: EventService, private router: Router) {

        // 原材料管理页面跳转事件监听
        this.eventBus.registerySubject('system_discount_main').subscribe(e => {
            this.router.navigate(['system/discount/main'], {queryParams: {data: e}});
        });

        // 原材料管理页面跳转事件监听
        this.eventBus.registerySubject('system_discount_main_add').subscribe(e => {
            this.router.navigate(['system/discount/main/add'], {queryParams: {data: e}});
        });

        // 原材料管理页面跳转事件监听
        this.eventBus.registerySubject('system_discount').subscribe(e => {
            this.router.navigate(['system/discount'], {queryParams: {data: e}});
        });

        // 原材料管理页面跳转事件监听
        this.eventBus.registerySubject('system_provider').subscribe(e => {
            this.router.navigate(['system/provider'], {queryParams: {data: e}});
        });

        // 原材料产品管理页面跳转事件监听
        this.eventBus.registerySubject('system_provider_product').subscribe(e => {
            this.router.navigate(['system/provider/product'], {queryParams: {data: e}});
        });

        // 原材料产品管理页面跳转事件监听
        this.eventBus.registerySubject('system_provider_product_add').subscribe(e => {
            this.router.navigate(['system/provider/product/add'], {queryParams: {data: e}});
        });

        // 原材料产品详情页面跳转事件监听
        this.eventBus.registerySubject('system_provider_product_detail').subscribe(e => {
            this.router.navigate(['system/provider/product/detail'], {queryParams: {data: e}});
        });

        // 原材料产品修改页面跳转事件监听
        this.eventBus.registerySubject('system_provider_product_modify').subscribe(e => {
            this.router.navigate(['system/provider/product/modify'], {queryParams: {data: e}});
        });
        // 原材料产品修改页面跳转事件监听
        this.eventBus.registerySubject('system_provider_nutritional').subscribe(e => {
            this.router.navigate(['system/provider/nutritional'], {queryParams: {data: e}});
        });
        // 原材料产品修改页面跳转事件监听
        this.eventBus.registerySubject('system_provider_manual').subscribe(e => {
            this.router.navigate(['system/provider/manual'], {queryParams: {data: e}});
        });
        // 原材料产品修改页面跳转事件监听
        this.eventBus.registerySubject('system_provider_price').subscribe(e => {
            this.router.navigate(['system/provider/price'], {queryParams: {data: e}});
        });

        // 店铺成本设置页面跳转事件监听
        this.eventBus.registerySubject('system_goods_cost_mng').subscribe(e => {
            this.router.navigate(['system/goods/cost/mng'], {queryParams: {data: e}});
        });

        // 店铺成本控制页面跳转事件监听
        this.eventBus.registerySubject('system_goods_cost').subscribe(e => {
            this.router.navigateByUrl('system/goods/cost');
        });

        // 疲劳度管理页面跳转事件监听
        this.eventBus.registerySubject('fatige_indicator_config_query').subscribe(e => {
            this.router.navigateByUrl('customer/query');
        });

        // 商品管理首页（通过店铺管理商品摘要）
        this.eventBus.registerySubject('system_goods_manage').subscribe(e => {
            this.router.navigateByUrl('system/goods');
        });

        // 特定店铺的商品摘要管理
        this.eventBus.registerySubject('system_goods_manage_all').subscribe(e => {
            this.router.navigate(['system/goods/all'], {queryParams: {data: e}});
        });

        // 添加商品摘要数据
        this.eventBus.registerySubject('system_goods_add').subscribe(e => {
            this.router.navigate(['system/goods/add'], {queryParams: {data: e}});
        });

        // 修改商品摘要数据
        this.eventBus.registerySubject('system_goods_modify').subscribe(e => {
            this.router.navigate(['system/goods/modify'], {queryParams: {data: e[0], id: e[1]}});
        });

        // 发布单条商品摘要数据
        this.eventBus.registerySubject('system_goods_view_active').subscribe(e => {
            this.router.navigate(['system/goods/view/active'], {queryParams: {data: e[0], id: e[1]}});
        });

        // 下架单条商品摘要数据
        this.eventBus.registerySubject('system_goods_view_inactive').subscribe(e => {
            this.router.navigate(['system/goods/view/inactive'], {queryParams: {data: e[0], id: e[1]}});
        });

        // 查看商品摘要数据
        this.eventBus.registerySubject('system_goods_view_detail').subscribe(e => {
            this.router.navigate(['system/goods/view/detail'], {queryParams: {data: e[0], id: e[1]}});
        });

        // 查看所有套餐包数据
        this.eventBus.registerySubject('system_goods_packages_all').subscribe(e => {
            this.router.navigate(['system/goods/packages/all'], {queryParams: {shop: e[0], goods: e[1]}});
        });

        // 查看所有温馨提醒数据
        this.eventBus.registerySubject('system_goods_packages_notice_all').subscribe(e => {
            this.router.navigate(['system/goods/packages/notice/all'], {queryParams: {shop: e[0], goods: e[1]}});
        });

        // 查看所有套餐详情图片数据
        this.eventBus.registerySubject('system_goods_packages_image_all').subscribe(e => {
            this.router.navigate(['system/goods/packages/image/all'], {queryParams: {shop: e[0], goods: e[1]}});
        });

        // 系统管理
        this.eventBus.registerySubject('system_shop_manage').subscribe(e => {
            this.router.navigateByUrl('system/shop');
        });

        // 系统管理
        this.eventBus.registerySubject('system_shop_add').subscribe(e => {
            this.router.navigateByUrl('system/shop/add');
        });

        // 系统管理
        this.eventBus.registerySubject('system_shop_modify').subscribe(e => {
            console.log('------------->', e);
            this.router.navigate(['system/shop/modify'], {queryParams: {id: e}});
        });

        // 系统管理
        this.eventBus.registerySubject('system_shop_view_detail').subscribe(e => {
            console.log('------------->', e);
            this.router.navigate(['system/shop/view/single'], {queryParams: {id: e}});
        });

        // 疲劳度管理页面跳转事件监听
        this.eventBus.registerySubject('system').subscribe(e => {
            this.router.navigateByUrl('system');
        });

        // 消息管理页面跳转事件监听
        this.eventBus.registerySubject('message_manager').subscribe(e => {
            this.router.navigateByUrl('message/query');
        });

        // 添加消息模板配置页面跳转事件监听
        this.eventBus.registerySubject('add_message_config').subscribe(e => {
            this.router.navigateByUrl('message/add');
        });

        // 修改消息模板配置页面跳转事件监听
        this.eventBus.registerySubject('modify_message_config').subscribe(e => {
            this.router.navigateByUrl('message/modify');
        });

        // 店内营销管理页面跳转事件监听
        this.eventBus.registerySubject('campaign_shop').subscribe(e => {
            this.router.navigateByUrl('system/campaign');
        });

        // 单个店铺店内营销管理页面跳转事件监听
        this.eventBus.registerySubject('campaign_shop_single').subscribe(e => {
            console.log('------------->', e);
            this.router.navigate(['system/campaign/single'], {queryParams: {data: e}});
        });

        // 单个店铺店内营销活动奖品管理页面跳转事件监听
        this.eventBus.registerySubject('campaign_shop_single_prize_mng').subscribe(e => {
            console.log('------------->', e);
            this.router.navigate(['system/campaign/prize'], {queryParams: {data: e}});
        });

        // 单个店铺店内营销活动奖品添加页面跳转事件监听
        this.eventBus.registerySubject('campaign_shop_single_prize_add').subscribe(e => {
            console.log('------------->', e);
            this.router.navigate(['system/campaign/prize/add'], {queryParams: {data: e}});
        });

        // 单个店铺店内营销活动奖品详情查看页面跳转事件监听
        this.eventBus.registerySubject('campaign_shop_single_prize_view_detail').subscribe(e => {
            console.log('------------->', e);
            this.router.navigate(['system/campaign/prize/view/detail'], {queryParams: {data: e}});
        });

        // 单个店铺店内营销活动奖品详情查看页面跳转事件监听
        this.eventBus.registerySubject('campaign_shop_single_prize_ref').subscribe(e => {
            console.log('------------->', e);
            this.router.navigate(['system/campaign/prize/ref'], {queryParams: {data: e}});
        });
    }

    ngOnInit(): void {
    }
}
