import { Component } from '@angular/core';
import { QuizComponent } from './quiz.component';
import { QuestionService } from './question.service';

@Component({
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>
    <my-quiz></my-quiz>
  `,
    directives: [QuizComponent],
    providers: [
        QuestionService
    ]
})
export class AppComponent {
    title = 'Angular Quiz Start Screen';
}