import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';

@Injectable()
export class UserDataService {

    private static PREFIX = "AngularTVQuiz_";
    private static USERNAME = UserDataService.PREFIX + "Username";

    constructor(private cookieService:CookieService){
    }

    getUsername(){
        return this.cookieService.get(UserDataService.USERNAME);
    }

    //TODO: validation & throw exception if bad?
    setUsername(username: string){
        this.cookieService.put(UserDataService.USERNAME, username);
    }
}