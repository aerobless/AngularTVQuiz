import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from './question';
import { Answer } from './answer';
import { QuestionService } from './question.service';

@Component({
  selector: 'my-quiz',
  templateUrl: 'app/templates/quiz.component.html'
})

export class QuizComponent implements OnInit, OnDestroy {
  title = 'Angular TV Quiz'
  questions: Question[];
  currentQuestion: Question;
  currentQuestionId = 0;
  selectedAnswer: Answer;

  socket = null;
  sub: any;
  id: string;

  constructor(private questionService: QuestionService, private route: ActivatedRoute){
    this.socket = io('http://localhost:8000');
    this.socket.on('greetings', function(message, id){
      console.log( 'Got a message from the server: "' + message + "', my ID is: " + id );
    }.bind(this));
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getQuestions();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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