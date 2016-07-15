import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from './services/userdata.service';
import { Question } from './question';
import { Answer } from './answer';
import {SyncService} from "./services/sync.service";

@Component({
  selector: 'my-quiz',
  templateUrl: 'app/templates/quiz.component.html',
  providers: [SyncService]
})

export class QuizComponent implements OnInit, OnDestroy {
  title = 'Angular TV Quiz'
  currentQuestion: Question;
  currentQuestionId = 0;
  selectedAnswer: Answer;
  solutionActive: boolean = false;

  sub: any;
  quizId: string;
  playerName: string;

  constructor(private route: ActivatedRoute, private userDataService:UserDataService, private syncService:SyncService, private router: Router){
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.quizId = params['id'];
      this.userDataService.setQuizId(this.quizId);
    });
    
    this.playerName = this.userDataService.getUsername();
    this.currentQuestion = new Question();

    if(this.playerName){ //checks if it is empty
      this.syncService.init(this.quizId);

      this.syncService.getQuestion().subscribe(
          question => {
            this.currentQuestion = question;
            this.solutionActive = false;
            this.selectedAnswer = null;
          }
      );

      this.syncService.isSolutionActive().subscribe(
          isActive => {
            this.solutionActive = isActive;
          }
      );

      this.syncService.requestQuestionFromServer(false);
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
    this.syncService.requestQuestionFromServer(true);
  }

  onSelect(answer: Answer) {
    this.selectedAnswer = answer;
    this.syncService.sendAnswerToServer(answer.id, this.playerName);
  }
}