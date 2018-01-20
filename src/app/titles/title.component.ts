import {Component, Injectable, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})

@Injectable()
export class TitleComponent implements OnInit {

  @Input() currentStep: string;
  title = 'customer!';


  ngOnInit(): void {
    console.log('----------------------->', this.currentStep);
  }
}
