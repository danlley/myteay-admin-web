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

        // 查看单条商品摘要数据
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
    }

    ngOnInit(): void {
    }
}
