import {Session} from "./session";
import {Question} from "../client/app/question";
export class SessionStorage {
    sessions:Session[] = [];

    setQuestion(quizId:string, question:Question){
        for(let session of this.sessions){
            if(session.quizId == quizId){
                return session;
            }
        }

        this.sessions.push({quizId: quizId, currentQuestion: question, currentQuestionId: 0, players: undefined});
    }

    getQuestion(quizId:string){
        for(let session of this.sessions){
            if(session.quizId == quizId){
                return session.currentQuestion;
            }
        }
        let session:Session = {quizId: quizId, currentQuestion: QUESTIONS[0], currentQuestionId: 0, players: undefined};
        this.sessions.push(session);
        return session.currentQuestion;
    }
    
    getNextQuestion(quizId:string){
        for(let session of this.sessions){
            if(session.quizId == quizId){
                this.nextQuestion(quizId);
                return session.currentQuestion;
            }
        }
        let session:Session = {quizId: quizId, currentQuestion: QUESTIONS[0], currentQuestionId: 0, players: undefined};
        this.sessions.push(session);
        return session.currentQuestion;
    }

    private nextQuestion(quizId:string){
        for(let session of this.sessions){
            if(session.quizId == quizId){
                session.currentQuestionId = session.currentQuestionId+1;
                if(session.currentQuestionId==QUESTIONS.length){
                    session.currentQuestionId = 0;
                }
                session.currentQuestion = QUESTIONS[session.currentQuestionId];
            }
        }
    }
}

const QUESTIONS: Question[] = [
    {text: 'An apple a day keeps the ___ away', answers: [{text: 'doctor', correct: true, players: undefined}, {text: 'cat', correct: false, players: undefined}, {text: 'ghost', correct: false, players: undefined}, {text: 'alien', correct: false, players: undefined}]},
    {text: 'What is the name of the highest mountain in the world', answers: [{text: 'Mount Everest', correct: true, players: undefined}, {text: 'Matterhorn', correct: false, players: undefined}]},
    {text: 'When was Google founded?', answers: [{text: 'September 4, 1998', correct: true, players: undefined}, {text: 'August 19, 1985', correct: false, players: undefined}, {text: 'September 15, 1997', correct: false, players: undefined}]},
    {text: 'What was the name of the first apple computer?', answers: [{text: 'Apple I', correct: true, players: undefined}, {text: 'Apple One', correct: false, players: undefined}, {text: 'A1', correct: false, players: undefined}]}
];