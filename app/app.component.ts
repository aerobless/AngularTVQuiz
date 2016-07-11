import { Component } from '@angular/core';
import { Question } from './question';
import { Answer } from './answer';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <h2>Question: {{currentQuestion.text}}</h2>
      <h3>Select the correct answer</h3>
      <ul>
        <li *ngFor="let answer of currentQuestion.answers" (click)="onSelect(answer)">
            <span>{{answer.text}}</span><span *ngIf="answer==selectedAnswer"> (selected)</span>
        </li>
      </ul>
      
      <button type="button" class="btn btn-primary" (click)="checkAnswer()">
        Check
      </button>
      
      <button type="button" class="btn btn-primary" (click)="messageTest()">
        Message test
      </button>
    `
})

export class AppComponent {
  title = 'Angular TV Quiz'
  questions = QUESTIONS;
  currentQuestionId = 0;
  currentQuestion = QUESTIONS[0];
  selectedAnswer: Answer;

  socket = null;

  constructor(){
    /*this.socket = io('http://localhost:8000');
    this.socket.on('greetings', function(message, id){
      console.log( 'Got a message from the server: "' + message + "', my ID is: " + id );
    }.bind(this));*/
  }

  messageTest(){

    ///this.socket.emit( 'message', 'Hello from the client' );
  }

  onSelect(answer: Answer) { this.selectedAnswer = answer; }

  checkAnswer(){
    if(this.selectedAnswer != null && this.selectedAnswer.correct){
      alert("Correct!");
      this.nextQuestion();
    }else if(this.selectedAnswer != null && !this.selectedAnswer.correct){
      alert("Wrong..");
    }else{
      alert("Please select an answer first..");
    }
  }

  nextQuestion(){
    this.currentQuestionId += 1;
    if(QUESTIONS.length > this.currentQuestionId){
      this.currentQuestion = this.questions[this.currentQuestionId];
    }
  }
}

const QUESTIONS: Question[] = [
  {text: 'An apple a day keeps the ___ away', answers: [{text: 'doctor', correct: true}, {text: 'cat', correct: false}]},
  {text: 'What is the name of the highest mountain in the world', answers: [{text: 'Mount Everest', correct: true}, {text: 'Matterhorn', correct: false}]},
  {text: 'When was Google founded?', answers: [{text: 'September 4, 1998', correct: true}, {text: 'August 19, 1985', correct: false}, {text: 'September 15, 1997', correct: false}]},
  {text: 'What was the name of the first apple computer?', answers: [{text: 'Apple I', correct: true}, {text: 'Apple One', correct: false}, {text: 'A1', correct: false}]}
];
