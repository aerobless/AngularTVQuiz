import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from './services/userdata.service';
import { Question } from './question';
import { Answer } from './answer';
import {ApplicationConfig} from "./applicationconfig";

@Component({
  selector: 'my-quiz',
  templateUrl: 'app/templates/quiz.component.html',
})

export class QuizComponent implements OnInit, OnDestroy {
  title = 'Angular TV Quiz'
  currentQuestion: Question;
  currentQuestionId = 0;
  selectedAnswer: Answer;

  socket = io(ApplicationConfig.SERVER_URL+":"+ApplicationConfig.SOCKET_CONNECTION_PORT);

  sub: any;
  quizId: string;
  playerName: string;

  constructor(private route: ActivatedRoute, private userDataService:UserDataService, private router: Router){
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.quizId = params['id'];
    });
    this.playerName = this.userDataService.getUsername();
    this.currentQuestion = new Question();

    if(this.playerName){ //checks if it is empty
      this.socket.on('questionResponse', function(message, quizId){
        console.log( 'Got a message from the server: "' + message.text );
        if(this.quizId == quizId){
          this.currentQuestion = message;
        }
      }.bind(this));

      this.socket.emit('registerPlayerRequest',this.quizId, this.playerName);
    }else{
      //Navigate back to start if no username was registered
      let link = ['/start'];
      this.router.navigate(link);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getMessageFromServer(){
    this.socket.emit( 'questionRequest', this.quizId);
  }

  onSelect(answer: Answer) {
    this.selectedAnswer = answer;
    this.socket.emit('solutionRequest', this.quizId, answer.id, this.playerName)
  }

  checkAnswer(){
    if(this.selectedAnswer == null){
      alert("Please select an answer first..");
    } else {
      this.socket.emit( 'checkRequest', this.quizId);
    }
  }
}