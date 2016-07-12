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
var question_service_1 = require('./question.service');
var AppComponent = (function () {
    function AppComponent(questionService) {
        this.questionService = questionService;
        this.title = 'Angular TV Quiz';
        this.currentQuestionId = 0;
        this.socket = null;
        this.socket = io('http://localhost:8000');
        this.socket.on('greetings', function (message, id) {
            console.log('Got a message from the server: "' + message + "', my ID is: " + id);
        }.bind(this));
    }
    AppComponent.prototype.ngOnInit = function () {
        this.getQuestions();
    };
    AppComponent.prototype.getQuestions = function () {
        this.questions = this.questionService.getQuestions();
        this.currentQuestion = this.questions[0];
    };
    AppComponent.prototype.messageTest = function () {
        ///this.socket.emit( 'message', 'Hello from the client' );
    };
    AppComponent.prototype.onSelect = function (answer) { this.selectedAnswer = answer; };
    AppComponent.prototype.checkAnswer = function () {
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
    AppComponent.prototype.nextQuestion = function () {
        this.currentQuestionId += 1;
        if (this.questions.length > this.currentQuestionId) {
            this.currentQuestion = this.questions[this.currentQuestionId];
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n    <h1>{{title}}</h1>\n    <h2>Question: {{currentQuestion.text}}</h2>\n      <h3>Select the correct answer</h3>\n      <ul>\n        <li *ngFor=\"let answer of currentQuestion.answers\" (click)=\"onSelect(answer)\">\n            <span>{{answer.text}}</span><span *ngIf=\"answer==selectedAnswer\"> (selected)</span>\n        </li>\n      </ul>\n      \n      <button type=\"button\" class=\"btn btn-primary\" (click)=\"checkAnswer()\">\n        Check\n      </button>\n      \n      <button type=\"button\" class=\"btn btn-primary\" (click)=\"messageTest()\">\n        Message test\n      </button>\n    ",
            providers: [question_service_1.QuestionService]
        }), 
        __metadata('design:paramtypes', [question_service_1.QuestionService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map