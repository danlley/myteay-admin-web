import {Component} from '@angular/core';

export interface AlertModel {
    title: string;
    message: string;
}

@Component({
    selector: 'app-alert',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})
export class DetailComponent {
    title: string;
    message: string;

}
