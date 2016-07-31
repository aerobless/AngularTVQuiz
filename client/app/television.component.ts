import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgStyle} from "@angular/common";
import {UserDataService} from './services/userdata.service';
import {Question} from './question';
import {Answer} from './answer';
import applicationConfig = require("./applicationconfig");
import {SyncService} from "./services/sync.service";

@Component({
    selector: 'my-tv',
    templateUrl: 'app/templates/television.component.html',
    directives: [NgStyle],
    providers: [SyncService]
})

export class TelevisionComponent implements OnInit, OnDestroy {
    currentQuestion:Question;
    currentQuestionId = 0;
    selectedAnswer:Answer;
    solutionActive:boolean = false;

    sub:any;
    quizId:string;
    playerName:string;
    timeRemaining:number = 0;
    timeRemainingInSeconds:number = 10;
    @Input('width') width;

    constructor(private route:ActivatedRoute, private userDataService:UserDataService, private syncService:SyncService) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.quizId = params['id'];
            this.userDataService.setQuizId(this.quizId);
        });

        this.playerName = this.userDataService.getUsername();
        this.currentQuestion = new Question();
        this.syncService.init(this.quizId);

        this.syncService.getQuestion().subscribe(
            question => {
                this.currentQuestion = question;
                this.solutionActive = false;

                if (this.timeRemaining == 0 || this.timeRemaining == 100) {
                    //Progressbar
                    this.timeRemaining = 0;
                    this.timeRemainingInSeconds = 10;
                    let interval = setInterval(() => {
                        this.timeRemaining += 1;
                        this.timeRemainingInSeconds = parseFloat((this.timeRemainingInSeconds - 0.1).toFixed(2));
                        if (this.timeRemaining >= 100) {
                            clearInterval(interval);
                        }
                    }, 100);
                }
            }
        );

        this.syncService.getSolution().subscribe(
            question => {
                this.currentQuestion = question;
                this.solutionActive = true;

            }
        );

        this.syncService.requestQuestionFromServer(false);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}