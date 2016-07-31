import {Injectable} from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import {Subject} from "rxjs/Rx";
import {Avatar, AVATARS} from "../avatar";

@Injectable()
export class UserDataService {

    private static PREFIX = "AngularTVQuiz_";
    private static USERNAME = UserDataService.PREFIX + "Username";
    private static AVATAR = UserDataService.PREFIX + "Avatar";

    private quizId = new Subject<string>();

    constructor(private cookieService:CookieService) {
    }

    getUsername() {
        return this.cookieService.get(UserDataService.USERNAME);
    }

    setUsername(username:string) {
        this.cookieService.put(UserDataService.USERNAME, username);
    }

    getAvatar() {
        let localName = this.cookieService.get(UserDataService.AVATAR);
        if (localName) {
            return Avatar.getAvatar(localName);
        } else {
            return Avatar.getRandom();
        }
    }

    setAvatar(avatar:Avatar) {
        this.cookieService.put(UserDataService.AVATAR, avatar.name);
    }

    getQuizId() {
        return this.quizId.asObservable();
    }

    setQuizId(quizId:string) {
        console.log("set " + quizId);
        this.quizId.next(quizId);
    }
}