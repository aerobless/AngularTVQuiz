import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { UserDataService } from './services/userdata.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/templates/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [CookieService, UserDataService]
})
export class AppComponent {
    title = 'Angular TV Quiz';
    quizId:string = 'unkown';

    constructor(private userDataService:UserDataService){

    }

    ngOnInit() {
        this.userDataService.getQuizId().subscribe(
            quizId => {
                this.quizId = quizId;
            }
        );
    }
}