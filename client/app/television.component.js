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
var applicationConfig = require("./applicationconfig");
var TelevisionComponent = (function () {
    function TelevisionComponent(route, userDataService) {
        this.route = route;
        this.userDataService = userDataService;
        this.currentQuestionId = 0;
        this.solutionActive = false;
        this.socket = null;
        this.timeRemaining = 0;
        this.socket = io(applicationConfig.SERVER_URL + ":" + applicationConfig.SOCKET_CONNECTION_PORT);
        this.socket.on('greetings', function (message, id) {
            console.log('Got a message from the server: "' + message + "', my ID is: " + id);
        }.bind(this));
    }
    TelevisionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.quizId = params['id'];
        });
        this.playerName = this.userDataService.getUsername();
        this.currentQuestion = new question_1.Question();
        this.socket.on('questionResponse', function (message, quizId) {
            var _this = this;
            console.log('Got a message from the server: "' + message);
            if (this.quizId == quizId) {
                this.currentQuestion = message;
                this.solutionActive = false;
                //TODO: maybe improve to be more stable
                if (this.timeRemaining == 0 || this.timeRemaining == 100) {
                    //Progressbar
                    this.timeRemaining = 0;
                    var interval_1 = setInterval(function () {
                        _this.timeRemaining += 1;
                        if (_this.timeRemaining >= 100) {
                            clearInterval(interval_1);
                        }
                    }, 100);
                }
            }
        }.bind(this));
        this.socket.on('solutionResponse', function (message, quizId) {
            console.log('Got a message from the server: "' + message);
            if (this.quizId == quizId) {
                this.currentQuestion = message;
                this.solutionActive = true;
            }
        }.bind(this));
        this.socket.emit('questionRequest', this.quizId, false);
    };
    TelevisionComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    TelevisionComponent.prototype.onSelect = function (answer) { this.selectedAnswer = answer; };
    __decorate([
        core_1.Input('width'), 
        __metadata('design:type', Object)
    ], TelevisionComponent.prototype, "width", void 0);
    TelevisionComponent = __decorate([
        core_1.Component({
            selector: 'my-quiz',
            templateUrl: 'app/templates/television.component.html',
            directives: [common_1.NgStyle]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, userdata_service_1.UserDataService])
    ], TelevisionComponent);
    return TelevisionComponent;
}());
exports.TelevisionComponent = TelevisionComponent;
//# sourceMappingURL=television.component.js.map