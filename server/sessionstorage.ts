import {Session} from "./session";
import {Question} from "../client/app/question";
import {Player} from "./player";
export class SessionStorage {
    sessions:Session[] = [];

    getQuestion(quizId:string) {
        for (let session of this.sessions) {
            if (session.quizId == quizId) {
                return session.currentQuestion;
            }
        }
        let session:Session = {
            quizId: quizId,
            currentQuestion: QUESTIONS[0],
            currentQuestionId: 0,
            players: [],
            interval: null
        };
        this.sessions.push(session);
        return session.currentQuestion;
    }

    getNextQuestion(quizId:string) {
        for (let session of this.sessions) {
            if (session.quizId == quizId) {
                this.nextQuestion(quizId);
                return session.currentQuestion;
            }
        }
        let session:Session = {
            quizId: quizId,
            currentQuestion: QUESTIONS[0],
            currentQuestionId: 0,
            players: [],
            interval: null
        };
        this.sessions.push(session);
        return session.currentQuestion;
    }

    private nextQuestion(quizId:string) {
        for (let session of this.sessions) {
            if (session.quizId == quizId) {
                session.currentQuestionId = session.currentQuestionId + 1;
                if (session.currentQuestionId == QUESTIONS.length) {
                    session.currentQuestionId = 0;
                }
                session.currentQuestion = QUESTIONS[session.currentQuestionId];
                session.currentQuestion.answers = SessionStorage.shuffle(session.currentQuestion.answers);
            }
        }
    }

    private static shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    setAnswer(quizId:string, answerId:number, playerName:string) {
        for (let session of this.sessions) {
            if (session.quizId == quizId) {
                for (let player of session.players) {
                    if (player.name === playerName) {
                        player.answer = answerId;
                        return;
                    }
                }
                let player:Player = {name: playerName, answer: answerId, points: 0};
                session.players.push(player);
            }
        }
    }

    getSolution(quizId:string) {
        for (let session of this.sessions) {
            if (session.quizId == quizId) {
                //Reset all answers
                for (let answer of session.currentQuestion.answers) {
                    answer.players = [];
                }
                //Set new answers
                for (let player of session.players) {
                    if (player.answer != null) {
                        for(let answer of session.currentQuestion.answers){
                            if (answer.correct && (player.answer == answer.id)) {
                                player.points += 10;
                            }
                            if (player.answer == answer.id){
                                answer.players.push(player.name + " (" + player.points + ")");
                            }
                        }
                    }
                    player.answer = null;
                }
                return session.currentQuestion;
            }
        }
    }

    setInterval(quizId:string, interval) {
        for (let session of this.sessions) {
            if (session.quizId == quizId) {
                session.interval = interval;
            }
        }
    }

    getInterval(quizId:string) {
        for (let session of this.sessions) {
            if (session.quizId == quizId) {
                return session.interval;
            }
        }
    }

}

const QUESTIONS:Question[] = [
    {
        text: 'An apple a day keeps the ___ away',
        answers: [{id: 0, text: 'doctor', correct: true, players: []}, {
            id: 1,
            text: 'cat',
            correct: false,
            players: []
        }, {id: 2, text: 'ghost', correct: false, players: []}, {id: 3, text: 'alien', correct: false, players: []}]
    },
    {
        text: 'What is the name of the highest mountain in the world',
        answers: [{id: 0, text: 'Mount Everest', correct: true, players: []}, {
            id: 1,
            text: 'Matterhorn',
            correct: false,
            players: []
        }]
    },
    {
        text: 'When was Google founded?',
        answers: [{id: 0, text: 'Sept. 4, 1998', correct: true, players: []}, {
            id: 1,
            text: 'Aug. 19, 1985',
            correct: false,
            players: []
        }, {id: 2, text: 'Sept. 15, 1997', correct: false, players: []}]
    },
    {
        text: 'What was the name of the first apple computer?',
        answers: [{id: 0, text: 'Apple I', correct: true, players: []}, {
            id: 1,
            text: 'Apple One',
            correct: false,
            players: []
        }, {id: 2, text: 'A1', correct: false, players: []}]
    }
];