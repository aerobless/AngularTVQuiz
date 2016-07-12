import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'my-start',
    templateUrl: 'app/templates/start.component.html',
    providers: [CookieService]
})
export class StartComponent implements OnInit{
    quizId: string;
    playerName: string;

    constructor(private router: Router, private cookieService:CookieService) {
    }

    ngOnInit() {
        this.quizId = this.makeId(5);
        this.playerName = this.cookieService.get("ATVQ_USERNAME");
    }

    makeId(idLength: number){
        let randomId = "";
        const possible = "abcdefghijklmnopqrstuvwxyz0123456789";

        for( let i=0; i < idLength; i++ )
            randomId += possible.charAt(Math.floor(Math.random() * possible.length));

        return randomId;
    }

    startQuiz(){
        this.storeUsername();
        let link = ['/quiz', this.quizId];
        this.router.navigate(link);
    }

    storeUsername(){
        this.cookieService.put("ATVQ_USERNAME", this.playerName);
    }

}