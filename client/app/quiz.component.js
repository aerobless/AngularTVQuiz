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
var router_1 = require('@angular/router');
var userdata_service_1 = require('./services/userdata.service');
var question_1 = require('./question');
var QuizComponent = (function () {
    function QuizComponent(route, userDataService) {
        this.route = route;
        this.userDataService = userDataService;
        this.title = 'Angular TV Quiz';
        this.currentQuestionId = 0;
        this.socket = io('http://localhost:8000');
    }
    QuizComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.quizId = params['id'];
        });
        this.playerName = this.userDataService.getUsername();
        //TODO: check if playerName is empty, if so navigate back to start
        this.currentQuestion = new question_1.Question();
        this.socket.on('questionResponse', function (message, id) {
            console.log('Got a message from the server: "' + message);
            this.currentQuestion = message;
        }.bind(this));
        this.socket.emit('questionRequest', this.quizId); //TODO: request differently
    };
    QuizComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    QuizComponent.prototype.getMessageFromServer = function () {
        this.socket.emit('questionRequest', this.quizId);
    };
    QuizComponent.prototype.onSelect = function (answer) { this.selectedAnswer = answer; };
    QuizComponent.prototype.checkAnswer = function () {
        if (this.selectedAnswer != null && this.selectedAnswer.correct) {
            alert("Correct!");
            this.getMessageFromServer();
        }
        else if (this.selectedAnswer != null && !this.selectedAnswer.correct) {
            alert("Wrong..");
        }
        else {
            alert("Please select an answer first..");
        }
    };
    QuizComponent = __decorate([
        core_1.Component({
            selector: 'my-quiz',
            templateUrl: 'app/templates/quiz.component.html',
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, userdata_service_1.UserDataService])
    ], QuizComponent);
    return QuizComponent;
}());
exports.QuizComponent = QuizComponent;
//# sourceMappingURL=quiz.component.js.map