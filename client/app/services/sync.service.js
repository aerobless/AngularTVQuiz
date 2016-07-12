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
var SyncService = (function () {
    function SyncService() {
        this.socket = io('http://localhost:8000');
    }
    SyncService.prototype.ngOnInit = function () {
    };
    SyncService.prototype.requestQuestion = function () {
        this.socket.on('greetings', function (message, id) {
            console.log('Got a message from the server: "' + message + "', my ID is: " + id);
        }.bind(this));
        this.socket.on("connect", function () {
            console.log("Connected!");
        });
    };
    SyncService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SyncService);
    return SyncService;
}());
exports.SyncService = SyncService;
//# sourceMappingURL=sync.service.js.map