"use strict";
var sessionstorage_1 = require("./sessionstorage");
var applicationConfig = require("../client/app/applicationconfig");
var express = require('express');
var app = express();
var server = require('http').Server(app);
var session = require('express-session');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var sessionStorage = new sessionstorage_1.SessionStorage();
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('questionRequest', function (quizId, sendNextQuestion) {
        var question;
        if (sendNextQuestion) {
            question = sessionStorage.getNextQuestion(quizId);
        }
        else {
            question = sessionStorage.getQuestion(quizId);
        }
        socket.broadcast.emit('questionResponse', question, quizId);
        socket.emit('questionResponse', question, quizId);
        var timeRemaining = 0;
        if (sessionStorage.getInterval(quizId) == null) {
            sessionStorage.setInterval(quizId, setInterval(function () {
                timeRemaining += 10;
                if (timeRemaining >= 100) {
                    var question_1 = sessionStorage.getSolution(quizId);
                    console.log("got check request");
                    socket.broadcast.emit('solutionResponse', question_1, quizId);
                    socket.emit('solutionResponse', question_1, quizId);
                    clearInterval(sessionStorage.getInterval(quizId));
                    sessionStorage.setInterval(quizId, null);
                }
            }, 1000));
        }
    });
    socket.on('solutionRequest', function (quizId, answerId, playerName, playerAvatar) {
        sessionStorage.setAnswer(quizId, answerId, playerName, playerAvatar);
        console.log(playerName + " registered answer " + answerId + " for quiz " + quizId);
    });
});
http.listen(applicationConfig.SOCKET_CONNECTION_PORT, function () {
    console.log('Socket server connected. Listening on port: ' + applicationConfig.SOCKET_CONNECTION_PORT);
});
var io = require('socket.io')(server, { log: false });
server.listen(applicationConfig.HTTP_PORT, function () {
    console.log('HTTP server connected. Listening on port: ' + applicationConfig.HTTP_PORT);
});
app.use(session({
    secret: 'can',
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client'));
app.use('/quiz/*', express.static(__dirname + '/../client'));
app.use('/tv/*', express.static(__dirname + '/../client'));
app.use('/start', express.static(__dirname + '/../client'));
var Routes = require('../routes.js');
var r = new Routes(app, io);
