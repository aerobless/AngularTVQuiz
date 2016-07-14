"use strict";
const sessionstorage_1 = require("./sessionstorage");
var express = require('express');
var app = express();
var server = require('http').Server(app);
var session = require('express-session');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
let sessionStorage = new sessionstorage_1.SessionStorage();
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('questionRequest', function (quizId) {
        let question = sessionStorage.getNextQuestion(quizId);
        socket.broadcast.emit('questionResponse', question, quizId);
        socket.emit('questionResponse', question, quizId);
    });
    socket.on('registerPlayerRequest', function (quizId) {
        let question = sessionStorage.getQuestion(quizId);
        socket.broadcast.emit('questionResponse', question, quizId);
        socket.emit('questionResponse', question, quizId);
    });
    socket.on('solutionRequest', function (quizId, answerId, playerName) {
        sessionStorage.setAnswer(quizId, answerId, playerName);
        console.log(playerName + " registered answer " + answerId + " for quiz " + quizId);
    });
    socket.on('checkRequest', function (quizId) {
        let question = sessionStorage.getSolution(quizId);
        console.log("got check request");
        socket.broadcast.emit('solutionResponse', question, quizId);
        socket.emit('solutionResponse', question, quizId);
    });
});
http.listen(9998, function () {
    console.log('listening on *:8000');
});
var io = require('socket.io')(server, { log: false });
server.listen(9999, function () {
    console.log("Server connected. Listening on port: 9999");
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
