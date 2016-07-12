import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from './services/userdata.service';
import { Question } from './question';
import { Answer } from './answer';

@Component({
  selector: 'my-quiz',
  templateUrl: 'app/templates/quiz.component.html',
})

export class QuizComponent implements OnInit, OnDestroy {
  title = 'Angular TV Quiz'
  currentQuestion: Question;
  currentQuestionId = 0;
  selectedAnswer: Answer;

  socket = io('http://localhost:8000');

  sub: any;
  quizId: string;
  playerName: string;

  constructor(private route: ActivatedRoute, private userDataService:UserDataService){
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.quizId = params['id'];
    });
    this.playerName = this.userDataService.getUsername();
    //TODO: check if playerName is empty, if so navigate back to start

    this.currentQuestion = new Question();

    this.socket.on('questionResponse', function(message, quizId){
      console.log( 'Got a message from the server: "' + message );
      if(this.quizId == quizId){
        this.currentQuestion = message;
      }
    }.bind(this));

    this.socket.emit( 'questionRequest', this.quizId); //TODO: request differently
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getMessageFromServer(){
    this.socket.emit( 'questionRequest', this.quizId);
  }

  onSelect(answer: Answer) { this.selectedAnswer = answer; }

  checkAnswer(){
    if(this.selectedAnswer != null && this.selectedAnswer.correct){
      alert("Correct!");
      this.getMessageFromServer();
    }else if(this.selectedAnswer != null && !this.selectedAnswer.correct){
      alert("Wrong..");
    }else{
      alert("Please select an answer first..");
    }
  }
}