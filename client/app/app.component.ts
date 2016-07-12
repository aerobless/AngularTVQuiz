import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { QuestionService } from './question.service';

@Component({
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>
    <nav>
        <a [routerLink]="['/start']">Restart</a>
    </nav>
    <router-outlet></router-outlet>
  `,
    directives: [ROUTER_DIRECTIVES],
    providers: [
        QuestionService
    ]
})
export class AppComponent {
    title = 'AngularTVQuiz';
}