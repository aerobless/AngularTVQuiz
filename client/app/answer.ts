import {Player} from "../../server/player";
export class Answer {
    id:number;
    text:string;
    correct:boolean;
    players:Player[] = [];
}