import {Component, Injectable, OnInit} from '@angular/core';

@Component({
    selector: 'app-bottom-bar',
    templateUrl: './bottom.component.html',
    styleUrls: ['./bottom.component.css']
})

@Injectable()
export class BottomComponent implements OnInit {

    // @Input() currentStep: string;
    title = 'customer!';
    currentYear = '2021';


    ngOnInit(): void {
        console.log('++++++++++++++++++++++++++++++++-->');


    }
}
