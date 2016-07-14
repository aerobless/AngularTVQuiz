import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import {Subject} from "rxjs/Rx";

@Injectable()
export class UserDataService {

    private static PREFIX = "AngularTVQuiz_";
    private static USERNAME = UserDataService.PREFIX + "Username";

    private quizId = new Subject<string>();

    constructor(private cookieService:CookieService){
    }

    getUsername(){
        return this.cookieService.get(UserDataService.USERNAME);
    }

    //TODO: validation & throw exception if bad?
    setUsername(username: string){
        this.cookieService.put(UserDataService.USERNAME, username);
    }

    getQuizId(){
        return this.quizId.asObservable();
    }

    setQuizId(quizId:string){
        console.log("set "+quizId);
        this.quizId.next(quizId);
    }
}