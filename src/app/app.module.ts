import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TitleComponent} from './titles/title.component';
import {BottomComponent} from './bottom/bottom.component';
import {DatePipe} from '@angular/common';
import {NgxQRCodeModule} from '@techiediaries/ngx-qrcode';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {EventService} from './asyncService/asyncService.service';
import {DefaultPageComponent} from './defaultPage/defaultPage.component';
import {SystemComponent} from './system/system.component';
import {SystemSideLeftComponent} from './system/systemSideLeft/systemSideLeft.component';
import {CampShopComponent} from './system/campaign/campShop.component';
import {CommonServie} from './utils/common.servie';
import {FatigeConfigService} from './customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {TableNoPaginatorComponent} from './tableNoPaginator/tableNoPaginator.component';
import {CampSingleShopComponent} from './system/campaign/campSingleShop/campSingleShop.component';
import {CampSingleShopPrizeMngComponent} from './system/campaign/campSingleShop/campSingleShopPrizeMng/campSingleShopPrizeMng.component';


@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    SystemSideLeftComponent,
    TableNoPaginatorComponent,
    DefaultPageComponent,
    SystemComponent,
    CampShopComponent,
    CampSingleShopComponent,
    CampSingleShopPrizeMngComponent,
    BottomComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxQRCodeModule,
    BrowserAnimationsModule,
    ModalModule.forRoot()
  ],
  providers: [
    BottomComponent,
    TitleComponent,
    DatePipe,
    EventService,
    CommonServie,
    FatigeConfigService,
    DefaultPageComponent,
    TableNoPaginatorComponent,
    SystemSideLeftComponent,
    SystemComponent,
    CampShopComponent,
    CampSingleShopComponent,
    CampSingleShopPrizeMngComponent,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
