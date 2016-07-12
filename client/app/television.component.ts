import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from './services/userdata.service';
import { Question } from './question';
import { Answer } from './answer';
import { QuestionService } from './services/question.service';

@Component({
    selector: 'my-quiz',
    templateUrl: 'app/templates/television.component.html'
})

export class TelevisionComponent implements OnInit, OnDestroy {
    title = 'Angular TV Quiz'
    currentQuestion: Question;
    currentQuestionId = 0;
    selectedAnswer: Answer;

    socket = null;
    sub: any;
    quizId: string;
    playerName: string;

    constructor(private route: ActivatedRoute, private userDataService:UserDataService){
        this.socket = io('http://localhost:8000');
        this.socket.on('greetings', function(message, id){
            console.log( 'Got a message from the server: "' + message + "', my ID is: " + id );
        }.bind(this));
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.quizId = params['id'];
        });
        this.playerName = this.userDataService.getUsername();
        //TODO: check if playerName is empty, if so navigate back to start

        this.currentQuestion = new Question();

        this.socket.on('questionResponse', function(message, id){
            console.log( 'Got a message from the server: "' + message );
            this.currentQuestion = message;
        }.bind(this));

        this.socket.emit( 'questionRequest', this.quizId); //TODO: request differently
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onSelect(answer: Answer) { this.selectedAnswer = answer; }
}