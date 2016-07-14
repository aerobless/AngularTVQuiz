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
var core_2 = require('angular2-cookie/core');
var userdata_service_1 = require('./services/userdata.service');
var applicationConfig = require("./applicationconfig");
var StartComponent = (function () {
    function StartComponent(router, userDataService) {
        this.router = router;
        this.userDataService = userDataService;
        this.SERVER_URL = applicationConfig.SERVER_URL;
        this.HTTP_PORT = applicationConfig.HTTP_PORT;
        this.SOCKET_CONNECTION_PORT = applicationConfig.SOCKET_CONNECTION_PORT;
    }
    StartComponent.prototype.ngOnInit = function () {
        this.quizId = this.makeId(5);
        this.playerName = this.userDataService.getUsername();
    };
    StartComponent.prototype.makeId = function (idLength) {
        var randomId = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < idLength; i++)
            randomId += possible.charAt(Math.floor(Math.random() * possible.length));
        return randomId;
    };
    StartComponent.prototype.startQuiz = function () {
        this.userDataService.setUsername(this.playerName);
        var link = ['/quiz', this.quizId];
        this.router.navigate(link);
    };
    StartComponent = __decorate([
        core_1.Component({
            selector: 'my-start',
            templateUrl: 'app/templates/start.component.html',
            providers: [core_2.CookieService, userdata_service_1.UserDataService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, userdata_service_1.UserDataService])
    ], StartComponent);
    return StartComponent;
}());
exports.StartComponent = StartComponent;
//# sourceMappingURL=start.component.js.map