import {Component, Injectable, Input, OnInit} from '@angular/core';
import {EventService} from '../asyncService/asyncService.service';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})

@Injectable()
export class TitleComponent implements OnInit {

  @Input() currentStep: string;
  title = 'customer!';
  eventBus: EventService;

  constructor(eventBus: EventService) {
    this.eventBus = eventBus;
  }

  ngOnInit(): void {
    console.log('页头加载完毕!');
  }

  public openUrl(topic): void {
    console.log('开始请求指定页面 topic=' + topic);
    this.eventBus.publish(topic, this.title);
  }
}
