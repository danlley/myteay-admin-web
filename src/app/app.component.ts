import {Component, OnInit} from '@angular/core';
import {EventService} from './asyncService/asyncService.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'app works!';

    constructor(private eventBus: EventService, private router: Router) {
        this.eventBus.registerySubject('fatige_indicator_config_query').subscribe(e => {
            this.router.navigateByUrl('customer/query');
        });
    }

    ngOnInit(): void {
    }
}
