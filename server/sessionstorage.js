"use strict";
var SessionStorage = (function () {
    function SessionStorage() {
        this.sessions = [];
    }
    SessionStorage.prototype.getQuestion = function (quizId) {
        for (var _i = 0, _a = this.sessions; _i < _a.length; _i++) {
            var session_1 = _a[_i];
            if (session_1.quizId == quizId) {
                return session_1.currentQuestion;
            }
        }
        var session = {
            quizId: quizId,
            currentQuestion: QUESTIONS[0],
            currentQuestionId: 0,
            players: [],
            interval: null
        };
        this.sessions.push(session);
        return session.currentQuestion;
    };
    SessionStorage.prototype.getNextQuestion = function (quizId) {
        for (var _i = 0, _a = this.sessions; _i < _a.length; _i++) {
            var session_2 = _a[_i];
            if (session_2.quizId == quizId) {
                this.nextQuestion(quizId);
                return session_2.currentQuestion;
            }
        }
        var session = {
            quizId: quizId,
            currentQuestion: QUESTIONS[0],
            currentQuestionId: 0,
            players: [],
            interval: null
        };
        this.sessions.push(session);
        return session.currentQuestion;
    };
    SessionStorage.prototype.nextQuestion = function (quizId) {
        for (var _i = 0, _a = this.sessions; _i < _a.length; _i++) {
            var session = _a[_i];
            if (session.quizId == quizId) {
                session.currentQuestionId = session.currentQuestionId + 1;
                if (session.currentQuestionId == QUESTIONS.length) {
                    session.currentQuestionId = 0;
                }
                session.currentQuestion = QUESTIONS[session.currentQuestionId];
                session.currentQuestion.answers = SessionStorage.shuffle(session.currentQuestion.answers);
            }
        }
    };
    SessionStorage.shuffle = function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };
    SessionStorage.prototype.setAnswer = function (quizId, answerId, playerName, playerAvatar) {
        for (var _i = 0, _a = this.sessions; _i < _a.length; _i++) {
            var session = _a[_i];
            if (session.quizId == quizId) {
                for (var _b = 0, _c = session.players; _b < _c.length; _b++) {
                    var player_1 = _c[_b];
                    if (player_1.name === playerName) {
                        player_1.answer = answerId;
                        player_1.avatar = playerAvatar;
                        return;
                    }
                }
                var player = { name: playerName, avatar: playerAvatar, answer: answerId, points: 0 };
                session.players.push(player);
            }
        }
    };
    SessionStorage.prototype.getSolution = function (quizId) {
        for (var _i = 0, _a = this.sessions; _i < _a.length; _i++) {
            var session = _a[_i];
            if (session.quizId == quizId) {
                for (var _b = 0, _c = session.currentQuestion.answers; _b < _c.length; _b++) {
                    var answer = _c[_b];
                    answer.players = [];
                }
                for (var _d = 0, _e = session.players; _d < _e.length; _d++) {
                    var player = _e[_d];
                    if (player.answer != null) {
                        for (var _f = 0, _g = session.currentQuestion.answers; _f < _g.length; _f++) {
                            var answer = _g[_f];
                            if (answer.correct && (player.answer == answer.id)) {
                                player.points += 10;
                            }
                            if (player.answer == answer.id) {
                                answer.players.push(player);
                            }
                        }
                    }
                    player.answer = null;
                }
                return session.currentQuestion;
            }
        }
    };
    SessionStorage.prototype.setInterval = function (quizId, interval) {
        for (var _i = 0, _a = this.sessions; _i < _a.length; _i++) {
            var session = _a[_i];
            if (session.quizId == quizId) {
                session.interval = interval;
            }
        }
    };
    SessionStorage.prototype.getInterval = function (quizId) {
        for (var _i = 0, _a = this.sessions; _i < _a.length; _i++) {
            var session = _a[_i];
            if (session.quizId == quizId) {
                return session.interval;
            }
        }
    };
    return SessionStorage;
}());
exports.SessionStorage = SessionStorage;
var QUESTIONS = [
    {
        text: 'An apple a day keeps the ___ away',
        answers: [{ id: 0, text: 'doctor', correct: true, players: [] }, {
                id: 1,
                text: 'cat',
                correct: false,
                players: []
            }, { id: 2, text: 'ghost', correct: false, players: [] }, { id: 3, text: 'alien', correct: false, players: [] }]
    },
    {
        text: 'What is the name of the highest mountain in the world',
        answers: [{ id: 0, text: 'Mount Everest', correct: true, players: [] }, {
                id: 1,
                text: 'Matterhorn',
                correct: false,
                players: []
            }]
    },
    {
        text: 'When was Google founded?',
        answers: [{ id: 0, text: 'Sept. 4, 1998', correct: true, players: [] }, {
                id: 1,
                text: 'Aug. 19, 1985',
                correct: false,
                players: []
            }, { id: 2, text: 'Sept. 15, 1997', correct: false, players: [] }]
    },
    {
        text: 'What was the name of the first apple computer?',
        answers: [{ id: 0, text: 'Apple I', correct: true, players: [] }, {
                id: 1,
                text: 'Apple One',
                correct: false,
                players: []
            }, { id: 2, text: 'A1', correct: false, players: [] }]
    }
];
