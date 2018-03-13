import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {appRouter} from './app.router';
import {TitleComponent} from './titles/title.component';
import {BottomComponent} from './bottom/bottom.component';
import {MtFatigeIndicatorConfigQueryComponent} from './customer/mtFatigeIndicatorConfigQuery/mtFatigeIndicatorConfigQuery.component';
import {DefaultPageComponent} from './defaultPage/defaultPage.component';
import {EventService} from './asyncService/asyncService.service';
import {FatigeConfigService} from './customer/mtFatigeIndicatorConfigQuery/service/fatigeConfig.service';
import {MessageManagerComponent} from './message/mtMessageManager/messageManager.component';
import {AddMessageConfigComponent} from './message/addMessageConfig/addMessageConfig.component';
import {MessageSideLeftComponent} from './message/messageSideLeft/messageSideLeft.component';
import {CustomerSideLeftComponent} from './customer/customerSideLeft/customerSideLeft.component';
import {TableNoPaginatorComponent} from './tableNoPaginator/tableNoPaginator.component';
import {ModifyMessageConfigComponent} from './message/modifyMessageConfig/modifyMessageConfig.component';

@NgModule({
    declarations: [
        AppComponent,
        TitleComponent,
        MtFatigeIndicatorConfigQueryComponent,
        MessageManagerComponent,
        AddMessageConfigComponent,
        ModifyMessageConfigComponent,
        MessageSideLeftComponent,
        CustomerSideLeftComponent,
        TableNoPaginatorComponent,
        DefaultPageComponent,
        BottomComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRouter),
        FormsModule,
        HttpModule
    ],
    providers: [BottomComponent,
        TitleComponent,
        EventService,
        FatigeConfigService,
        DefaultPageComponent,
        MessageManagerComponent,
        AddMessageConfigComponent,
        ModifyMessageConfigComponent,
        CustomerSideLeftComponent,
        TableNoPaginatorComponent,
        MessageSideLeftComponent,
        MtFatigeIndicatorConfigQueryComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
