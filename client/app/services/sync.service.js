"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var applicationConfig = require("../applicationconfig");
var Rx_1 = require("rxjs/Rx");
var SyncService = (function () {
    function SyncService() {
        this.socket = io(applicationConfig.SERVER_URL + ":" + applicationConfig.SOCKET_CONNECTION_PORT);
        this.currentQuestion = new Rx_1.Subject();
        this.currentSolution = new Rx_1.Subject();
        this.solutionActive = new Rx_1.Subject();
    }
    SyncService.prototype.init = function (quizId) {
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
    };
    SyncService.prototype.getQuestion = function () {
        return this.currentQuestion.asObservable();
    };
    SyncService.prototype.getSolution = function () {
        return this.currentSolution.asObservable();
    };
    SyncService.prototype.isSolutionActive = function () {
        return this.solutionActive.asObservable();
    };
    SyncService.prototype.requestQuestionFromServer = function (nextQuestion) {
        this.socket.emit('questionRequest', this.quizId, nextQuestion);
    };
    SyncService.prototype.sendAnswerToServer = function (answerId, playerName) {
        this.socket.emit('solutionRequest', this.quizId, answerId, playerName);
    };
    SyncService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SyncService);
    return SyncService;
}());
exports.SyncService = SyncService;
//# sourceMappingURL=sync.service.js.map