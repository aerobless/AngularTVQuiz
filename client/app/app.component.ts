import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { UserDataService } from './services/userdata.service';

@Component({
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>
    <!--<nav>
        <a [routerLink]="['/start']">Reset</a>
    </nav>-->
    <router-outlet></router-outlet>
  `,
    directives: [ROUTER_DIRECTIVES],
    providers: [CookieService, UserDataService]
})
export class AppComponent {
    title = 'AngularTVQuiz';
}