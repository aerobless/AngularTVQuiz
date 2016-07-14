import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from './services/userdata.service';
import { Question } from './question';
import { Answer } from './answer';
import applicationConfig = require("./applicationconfig");

@Component({
    selector: 'my-quiz',
    templateUrl: 'app/templates/television.component.html'
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

    constructor(private route: ActivatedRoute, private userDataService:UserDataService){
        this.socket = io(applicationConfig.SERVER_URL+":"+applicationConfig.SOCKET_CONNECTION_PORT);
        this.socket.on('greetings', function(message, id){
            console.log( 'Got a message from the server: "' + message + "', my ID is: " + id );
        }.bind(this));
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.quizId = params['id'];
        });
        this.playerName = this.userDataService.getUsername();

        this.currentQuestion = new Question();

        this.socket.on('questionResponse', function(message, quizId){
            console.log( 'Got a message from the server: "' + message );
            if(this.quizId == quizId){
                this.currentQuestion = message;
                this.solutionActive = false;
            }
        }.bind(this));

        this.socket.on('solutionResponse', function(message, quizId){
            console.log( 'Got a message from the server: "' + message );
            if(this.quizId == quizId){
                this.currentQuestion = message;
                this.solutionActive = true;
            }
        }.bind(this));

        this.socket.emit('registerPlayerRequest',this.quizId, 'tv');
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onSelect(answer: Answer) { this.selectedAnswer = answer; }
}