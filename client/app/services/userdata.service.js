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
var core_2 = require('angular2-cookie/core');
var Rx_1 = require("rxjs/Rx");
var avatar_1 = require("../avatar");
var UserDataService = (function () {
    function UserDataService(cookieService) {
        this.cookieService = cookieService;
        this.quizId = new Rx_1.Subject();
    }
    UserDataService.prototype.getUsername = function () {
        return this.cookieService.get(UserDataService.USERNAME);
    };
    UserDataService.prototype.setUsername = function (username) {
        this.cookieService.put(UserDataService.USERNAME, username);
    };
    UserDataService.prototype.getAvatar = function () {
        var localName = this.cookieService.get(UserDataService.AVATAR);
        if (localName) {
            return avatar_1.Avatar.getAvatar(localName);
        }
        else {
            return avatar_1.Avatar.getRandom();
        }
    };
    UserDataService.prototype.setAvatar = function (avatar) {
        this.cookieService.put(UserDataService.AVATAR, avatar.name);
    };
    UserDataService.prototype.getQuizId = function () {
        return this.quizId.asObservable();
    };
    UserDataService.prototype.setQuizId = function (quizId) {
        console.log("set " + quizId);
        this.quizId.next(quizId);
    };
    UserDataService.PREFIX = "AngularTVQuiz_";
    UserDataService.USERNAME = UserDataService.PREFIX + "Username";
    UserDataService.AVATAR = UserDataService.PREFIX + "Avatar";
    UserDataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_2.CookieService])
    ], UserDataService);
    return UserDataService;
}());
exports.UserDataService = UserDataService;
//# sourceMappingURL=userdata.service.js.map