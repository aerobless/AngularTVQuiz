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
var sync_service_1 = require("./services/sync.service");
var QuizComponent = (function () {
    function QuizComponent(route, userDataService, syncService, router) {
        this.route = route;
        this.userDataService = userDataService;
        this.syncService = syncService;
        this.router = router;
        this.title = 'Angular TV Quiz';
        this.currentQuestionId = 0;
        this.solutionActive = false;
    }
    QuizComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.quizId = params['id'];
            _this.userDataService.setQuizId(_this.quizId);
        });
        this.playerName = this.userDataService.getUsername();
        this.playerAvatar = this.userDataService.getAvatar();
        this.currentQuestion = new question_1.Question();
        if (this.playerName && this.playerAvatar) {
            this.syncService.init(this.quizId);
            this.syncService.getQuestion().subscribe(function (question) {
                _this.currentQuestion = question;
                _this.solutionActive = false;
                _this.selectedAnswer = null;
            });
            this.syncService.isSolutionActive().subscribe(function (isActive) {
                _this.solutionActive = isActive;
            });
            this.syncService.requestQuestionFromServer(false);
        }
        else {
            //Navigate back to start if no username was registered
            var link = ['/start'];
            this.router.navigate(link);
        }
    };
    QuizComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    QuizComponent.prototype.getMessageFromServer = function () {
        this.syncService.requestQuestionFromServer(true);
    };
    QuizComponent.prototype.onSelect = function (answer) {
        this.selectedAnswer = answer;
        this.syncService.sendAnswerToServer(answer.id, this.playerName, this.playerAvatar);
    };
    QuizComponent = __decorate([
        core_1.Component({
            selector: 'my-quiz',
            templateUrl: 'app/templates/quiz.component.html',
            providers: [sync_service_1.SyncService]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, userdata_service_1.UserDataService, sync_service_1.SyncService, router_1.Router])
    ], QuizComponent);
    return QuizComponent;
}());
exports.QuizComponent = QuizComponent;
//# sourceMappingURL=quiz.component.js.map