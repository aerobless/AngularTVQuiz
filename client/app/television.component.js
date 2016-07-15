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
var common_1 = require("@angular/common");
var userdata_service_1 = require('./services/userdata.service');
var question_1 = require('./question');
var sync_service_1 = require("./services/sync.service");
var TelevisionComponent = (function () {
    function TelevisionComponent(route, userDataService, syncService) {
        this.route = route;
        this.userDataService = userDataService;
        this.syncService = syncService;
        this.currentQuestionId = 0;
        this.solutionActive = false;
        this.timeRemaining = 0;
        this.timeRemainingInSeconds = 10;
    }
    TelevisionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.quizId = params['id'];
            _this.userDataService.setQuizId(_this.quizId);
        });
        this.playerName = this.userDataService.getUsername();
        this.currentQuestion = new question_1.Question();
        this.syncService.init(this.quizId);
        this.syncService.getQuestion().subscribe(function (question) {
            _this.currentQuestion = question;
            _this.solutionActive = false;
            if (_this.timeRemaining == 0 || _this.timeRemaining == 100) {
                //Progressbar
                _this.timeRemaining = 0;
                _this.timeRemainingInSeconds = 10;
                var interval_1 = setInterval(function () {
                    _this.timeRemaining += 1;
                    _this.timeRemainingInSeconds = (_this.timeRemainingInSeconds - 0.1).toFixed(2);
                    if (_this.timeRemaining >= 100) {
                        clearInterval(interval_1);
                    }
                }, 100);
            }
        });
        this.syncService.getSolution().subscribe(function (question) {
            _this.currentQuestion = question;
            _this.solutionActive = true;
        });
        this.syncService.requestQuestionFromServer(false);
    };
    TelevisionComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    __decorate([
        core_1.Input('width'), 
        __metadata('design:type', Object)
    ], TelevisionComponent.prototype, "width", void 0);
    TelevisionComponent = __decorate([
        core_1.Component({
            selector: 'my-tv',
            templateUrl: 'app/templates/television.component.html',
            directives: [common_1.NgStyle],
            providers: [sync_service_1.SyncService]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, userdata_service_1.UserDataService, sync_service_1.SyncService])
    ], TelevisionComponent);
    return TelevisionComponent;
}());
exports.TelevisionComponent = TelevisionComponent;
//# sourceMappingURL=television.component.js.map