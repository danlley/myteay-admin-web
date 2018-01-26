import {Component, OnInit} from '@angular/core';
import {FatigeConfigService} from './service/fatigeConfig.service';

@Component({
  selector: 'app-mt-fatige-indicator-config-query',
  templateUrl: './mtFatigeIndicatorConfigQuery.component.html',
  styleUrls: ['./mtFatigeIndicatorConfigQuery.component.css']
})
export class MtFatigeIndicatorConfigQueryComponent implements OnInit {
  title = '疲劳度控制配置查询!';
  ftConfitService: FatigeConfigService;

  constructor(ftConfitService: FatigeConfigService) {
    this.ftConfitService = ftConfitService;
  }

  ngOnInit(): void {
    this.ftConfitService.getAllFatigeIndicatorConfig();
    console.log(this.title);
  }

  load() {
    this.ftConfitService.getAllFatigeIndicatorConfig();
  }
}
