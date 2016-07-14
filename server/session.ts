import {Question} from "../client/app/question";
import {Player} from "./player";
export class Session {
    quizId: string;
    currentQuestion: Question;
    currentQuestionId: number;
    players: Player[] = [];
    interval: any;
}