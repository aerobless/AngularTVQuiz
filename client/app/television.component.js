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
var TelevisionComponent = (function () {
    function TelevisionComponent(route, userDataService) {
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
    TelevisionComponent.prototype.ngOnInit = function () {
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
    TelevisionComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    TelevisionComponent.prototype.onSelect = function (answer) { this.selectedAnswer = answer; };
    TelevisionComponent = __decorate([
        core_1.Component({
            selector: 'my-quiz',
            templateUrl: 'app/templates/television.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, userdata_service_1.UserDataService])
    ], TelevisionComponent);
    return TelevisionComponent;
}());
exports.TelevisionComponent = TelevisionComponent;
//# sourceMappingURL=television.component.js.map