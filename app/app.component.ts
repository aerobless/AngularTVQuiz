import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <h2>{{questions[0].text}}</h2>
    <div>
      <label>question: </label>
      <input [(ngModel)]="questions[0].text" placeholder="question">
    </div>
    <h2>Questions</h2>
    <ul>
      <li *ngFor="let question of questions">
        <span>{{question.text}}</span>
        <ul>
          <li *ngFor="let answer of question.answers">
              <span>{{answer.text}}</span>
          </li>
        </ul>
      </li>
    </ul>
    `
})

export class AppComponent {
  title = 'Angular TV Quiz'
  questions = QUESTIONS;
}

export class Question {
  text: string;
  answers: Answer[];
}

export class Answer {
  text: string;
  correct: boolean;
}

const QUESTIONS: Question[] = [
  {text: 'An apple a day keeps the ___ away', answers: [{text: 'doctor', correct: true}, {text: 'cat', correct: false}]},
  {text: 'What is the name of the highest mountain in the world', answers: [{text: 'Mount Everest', correct: true}, {text: 'Matterhorn', correct: false}]},
  {text: 'When was Google founded?', answers: [{text: 'September 4, 1998', correct: true}, {text: 'August 19, 1985', correct: false}, {text: 'September 15, 1997', correct: false}]},
  {text: 'What was the name of the first apple computer?', answers: [{text: 'Apple I', correct: true}, {text: 'Apple One', correct: false}, {text: 'A1', correct: false}]}
];
