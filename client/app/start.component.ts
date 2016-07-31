import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {UserDataService} from './services/userdata.service';
import applicationConfig = require("./applicationconfig");
import {Avatar, AVATARS} from "./avatar";

@Component({
    selector: 'my-start',
    templateUrl: 'app/templates/start.component.html',
    providers: [CookieService, UserDataService]
})

export class StartComponent implements OnInit {
    quizId:string;
    playerName:string;
    playerAvatar:Avatar;
    avatars:Avatar[] = AVATARS;
    SERVER_URL:string = applicationConfig.SERVER_URL;
    HTTP_PORT:string = applicationConfig.HTTP_PORT;
    SOCKET_CONNECTION_PORT:string = applicationConfig.SOCKET_CONNECTION_PORT;

    constructor(private router:Router, private userDataService:UserDataService) {
    }

    ngOnInit() {
        this.quizId = this.makeId(5);
        this.playerName = this.userDataService.getUsername();
        this.playerAvatar = this.userDataService.getAvatar();
    }

    makeId(idLength:number) {
        let randomId = "";
        const possible = "abcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < idLength; i++)
            randomId += possible.charAt(Math.floor(Math.random() * possible.length));

        return randomId;
    }

    onSelect(avatar:Avatar) {
        this.playerAvatar = avatar;
        this.userDataService.setAvatar(avatar);
    }

    startQuiz() {
        this.userDataService.setUsername(this.playerName);
        let link = ['/quiz', this.quizId];
        this.router.navigate(link);
    }

}