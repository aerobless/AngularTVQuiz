"use strict";
class SessionStorage {
    constructor() {
        this.sessions = [];
    }
    getQuestion(quizId) {
        for (let session of this.sessions) {
            if (session.quizId == quizId) {
                return session.currentQuestion;
            }
        }
        let session = { quizId: quizId, currentQuestion: QUESTIONS[0], currentQuestionId: 0, players: undefined };
        this.sessions.push(session);
        return session.currentQuestion;
    }
    getNextQuestion(quizId) {
        for (let session of this.sessions) {
            if (session.quizId == quizId) {
                this.nextQuestion(quizId);
                return session.currentQuestion;
            }
        }
        let session = { quizId: quizId, currentQuestion: QUESTIONS[0], currentQuestionId: 0, players: undefined };
        this.sessions.push(session);
        return session.currentQuestion;
    }
    nextQuestion(quizId) {
        for (let session of this.sessions) {
            if (session.quizId == quizId) {
                session.currentQuestionId = session.currentQuestionId + 1;
                if (session.currentQuestionId == QUESTIONS.length) {
                    session.currentQuestionId = 0;
                }
                session.currentQuestion = QUESTIONS[session.currentQuestionId];
            }
        }
    }
    setAnswer(quizId, answerId, playerName) {
        for (let session of this.sessions) {
            if (session.quizId == quizId) {
                session.currentQuestion.answers[answerId].players.push(playerName);
            }
        }
    }
}
exports.SessionStorage = SessionStorage;
const QUESTIONS = [
    { text: 'An apple a day keeps the ___ away', answers: [{ id: 0, text: 'doctor', correct: true, players: [] }, { id: 1, text: 'cat', correct: false, players: [] }, { id: 2, text: 'ghost', correct: false, players: [] }, { id: 3, text: 'alien', correct: false, players: [] }] },
    { text: 'What is the name of the highest mountain in the world', answers: [{ id: 0, text: 'Mount Everest', correct: true, players: [] }, { id: 2, text: 'Matterhorn', correct: false, players: [] }] },
    { text: 'When was Google founded?', answers: [{ id: 0, text: 'September 4, 1998', correct: true, players: [] }, { id: 1, text: 'August 19, 1985', correct: false, players: [] }, { id: 2, text: 'September 15, 1997', correct: false, players: [] }] },
    { text: 'What was the name of the first apple computer?', answers: [{ id: 0, text: 'Apple I', correct: true, players: [] }, { id: 1, text: 'Apple One', correct: false, players: [] }, { id: 2, text: 'A1', correct: false, players: [] }] }
];
