import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Question } from './question';
import { Answer } from './answer';
import { QuestionService } from './question.service';

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
    `,
  providers: [QuestionService]
})

export class AppComponent implements OnInit {
  title = 'Angular TV Quiz'
  questions: Question[];
  currentQuestion: Question;
  currentQuestionId = 0;
  selectedAnswer: Answer;

  socket = null;

  constructor(private questionService: QuestionService){
    this.socket = io('http://localhost:8000');
    this.socket.on('greetings', function(message, id){
      console.log( 'Got a message from the server: "' + message + "', my ID is: " + id );
    }.bind(this));
  }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions(){
    this.questions = this.questionService.getQuestions();
    this.currentQuestion = this.questions[0];
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
    if(this.questions.length > this.currentQuestionId){
      this.currentQuestion = this.questions[this.currentQuestionId];
    }
  }
}