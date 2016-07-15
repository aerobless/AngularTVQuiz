import {Injectable} from '@angular/core';
import applicationConfig = require("../applicationconfig");
import {Question} from "../question";
import {Subject} from "rxjs/Rx";

@Injectable()
export class SyncService {
    private socket = io(applicationConfig.SERVER_URL + ":" + applicationConfig.SOCKET_CONNECTION_PORT);
    private currentQuestion = new Subject<Question>();
    private currentSolution = new Subject<Question>();
    private quizId:string;
    private solutionActive = new Subject<boolean>();

    init(quizId:string) {
        this.quizId = quizId;

        this.socket.on('questionResponse', function (message, remoteQuizId) {
            if (this.quizId == remoteQuizId) {
                this.currentQuestion.next(message);
            }
        }.bind(this));

        this.socket.on('solutionResponse', function (message, quizId) {
            if (this.quizId == quizId) {
                this.solutionActive.next(true);
                this.currentSolution.next(message);
            }
        }.bind(this));
    }

    getQuestion() {
        return this.currentQuestion.asObservable();
    }

    getSolution() {
        return this.currentSolution.asObservable();
    }

    isSolutionActive() {
        return this.solutionActive.asObservable();
    }

    requestQuestionFromServer(nextQuestion:boolean) {
        this.socket.emit('questionRequest', this.quizId, nextQuestion);
    }

    sendAnswerToServer(answerId:number, playerName:string) {
        this.socket.emit('solutionRequest', this.quizId, answerId, playerName);
    }
}