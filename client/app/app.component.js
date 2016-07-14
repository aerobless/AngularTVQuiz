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
var AppComponent = (function () {
    function AppComponent(userDataService) {
        this.userDataService = userDataService;
        this.title = 'Angular TV Quiz';
        this.quizId = 'unkown';
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userDataService.getQuizId().subscribe(function (quizId) {
            _this.quizId = quizId;
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/templates/app.component.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [core_2.CookieService, userdata_service_1.UserDataService]
        }), 
        __metadata('design:paramtypes', [userdata_service_1.UserDataService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map