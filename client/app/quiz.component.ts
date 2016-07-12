import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from './services/userdata.service';
import { Question } from './question';
import { Answer } from './answer';
import { QuestionService } from './services/question.service';

@Component({
  selector: 'my-quiz',
  templateUrl: 'app/templates/quiz.component.html',
  providers: [QuestionService]
})

export class QuizComponent implements OnInit, OnDestroy {
  title = 'Angular TV Quiz'
  questions: Question[];
  currentQuestion: Question;
  currentQuestionId = 0;
  selectedAnswer: Answer;

  socket = null;
  sub: any;
  quizId: string;
  playerName: string;

  constructor(private questionService: QuestionService, private route: ActivatedRoute, private userDataService:UserDataService){
    this.socket = io('http://localhost:8000');
    this.socket.on('greetings', function(message, id){
      console.log( 'Got a message from the server: "' + message + "', my ID is: " + id );
    }.bind(this));
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.quizId = params['id'];
    });
    this.getQuestions();
    this.playerName = this.userDataService.getUsername();
    //TODO: check if playerName is empty, if so navigate back to start
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