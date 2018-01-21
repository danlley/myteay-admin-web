import {Component, Injectable, Input, OnInit} from '@angular/core';
import {EventService} from '../asyncService/asyncService.component';

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
    console.log('ҳͷ�������!');
  }

  public openUrl(topic): void {
    console.log('��ʼ����ָ��ҳ�� topic=' + topic);
    this.eventBus.publish(topic, this.title);
  }
}
