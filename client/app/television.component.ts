import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgStyle} from "@angular/common";
import { UserDataService } from './services/userdata.service';
import { Question } from './question';
import { Answer } from './answer';
import applicationConfig = require("./applicationconfig");

@Component({
    selector: 'my-tv',
    templateUrl: 'app/templates/television.component.html',
    directives: [NgStyle]
})

export class TelevisionComponent implements OnInit, OnDestroy {
    currentQuestion: Question;
    currentQuestionId = 0;
    selectedAnswer: Answer;
    solutionActive: boolean = false;

    socket = null;
    sub: any;
    quizId: string;
    playerName: string;
    timeRemaining: number = 0;
    timeRemainingInSeconds: number = 10;
    @Input('width') width;

    constructor(private route: ActivatedRoute, private userDataService:UserDataService){
    }

    ngOnInit() {
        this.socket = io(applicationConfig.SERVER_URL+":"+applicationConfig.SOCKET_CONNECTION_PORT);
        this.socket.on('greetings', function(message, id){
            console.log( 'Got a message from the server: "' + message + "', my ID is: " + id );
        }.bind(this));

        this.sub = this.route.params.subscribe(params => {
            this.quizId = params['id'];
            this.userDataService.setQuizId(this.quizId);
        });
        this.playerName = this.userDataService.getUsername();

        this.currentQuestion = new Question();

        this.socket.on('questionResponse', function(message, quizId){
            console.log( 'Got a message from the server: "' + message );
            if(this.quizId == quizId){
                this.currentQuestion = message;
                this.solutionActive = false;

                if(this.timeRemaining == 0 || this.timeRemaining == 100){
                    //Progressbar
                    this.timeRemaining = 0;
                    this.timeRemainingInSeconds = 10;
                    let interval = setInterval(() => {
                        this.timeRemaining += 1;
                        this.timeRemainingInSeconds = (this.timeRemainingInSeconds - 0.1).toFixed(2);
                        if(this.timeRemaining >= 100){
                            clearInterval(interval);
                        }
                    }, 100);
                }
            }
        }.bind(this));

        this.socket.on('solutionResponse', function(message, quizId){
            console.log( 'Got a message from the server: "' + message );
            if(this.quizId == quizId){
                this.currentQuestion = message;
                this.solutionActive = true;
            }
        }.bind(this));

        this.socket.emit('questionRequest',this.quizId, false);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onSelect(answer: Answer) { this.selectedAnswer = answer; }
}