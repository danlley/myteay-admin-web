import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-mt-fatige-indicator-config-query',
  templateUrl: './mtFatigeIndicatorConfigQuery.component.html',
  styleUrls: ['./mtFatigeIndicatorConfigQuery.component.css']
})
export class MtFatigeIndicatorConfigQueryComponent implements OnInit {
  title = '疲劳度控制配置查询!';

  ngOnInit(): void {
    console.log(this.title);
  }
}
