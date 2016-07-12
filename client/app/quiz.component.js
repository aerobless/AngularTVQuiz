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
var question_service_1 = require('./services/question.service');
var QuizComponent = (function () {
    function QuizComponent(questionService, route, userDataService) {
        this.questionService = questionService;
        this.route = route;
        this.userDataService = userDataService;
        this.title = 'Angular TV Quiz';
        this.currentQuestionId = 0;
        this.socket = null;
        this.socket = io('http://localhost:8000');
        this.socket.on('greetings', function (message, id) {
            console.log('Got a message from the server: "' + message + "', my ID is: " + id);
        }.bind(this));
    }
    QuizComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.quizId = params['id'];
        });
        this.getQuestions();
        this.playerName = this.userDataService.getUsername();
        //TODO: check if playerName is empty, if so navigate back to start
    };
    QuizComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    QuizComponent.prototype.getQuestions = function () {
        this.questions = this.questionService.getQuestions();
        this.currentQuestion = this.questions[0];
    };
    QuizComponent.prototype.messageTest = function () {
        ///this.socket.emit( 'message', 'Hello from the client' );
    };
    QuizComponent.prototype.onSelect = function (answer) { this.selectedAnswer = answer; };
    QuizComponent.prototype.checkAnswer = function () {
        if (this.selectedAnswer != null && this.selectedAnswer.correct) {
            alert("Correct!");
            this.nextQuestion();
        }
        else if (this.selectedAnswer != null && !this.selectedAnswer.correct) {
            alert("Wrong..");
        }
        else {
            alert("Please select an answer first..");
        }
    };
    QuizComponent.prototype.nextQuestion = function () {
        this.currentQuestionId += 1;
        if (this.questions.length > this.currentQuestionId) {
            this.currentQuestion = this.questions[this.currentQuestionId];
        }
    };
    QuizComponent = __decorate([
        core_1.Component({
            selector: 'my-quiz',
            templateUrl: 'app/templates/quiz.component.html',
            providers: [question_service_1.QuestionService]
        }), 
        __metadata('design:paramtypes', [question_service_1.QuestionService, router_1.ActivatedRoute, userdata_service_1.UserDataService])
    ], QuizComponent);
    return QuizComponent;
}());
exports.QuizComponent = QuizComponent;
//# sourceMappingURL=quiz.component.js.map