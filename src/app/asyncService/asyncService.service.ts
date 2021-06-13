import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class EventService {

  private subjects = {};

  public publish(name: string, event: any) {
    if (this.noSubject(name)) {
      console.log('开始发布异步消息不可用 name=' + name);
      return;
    }
    this.subjects[name].next(event);
  }

  public registerySubject(name: string): Observable<any> {
    if (this.noSubject(name)) {
      console.log('注册异步事件不可用 name=' + name);
    }
    this.subjects[name] = new Subject<string>();

    return this.subjects[name].asObservable();
  }

  public noSubject(name: string): boolean {
    return name === undefined;
  }
}


