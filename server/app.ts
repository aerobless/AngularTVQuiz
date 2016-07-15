/// <reference path="../typings/index.d.ts" />
import {SessionStorage} from "./sessionstorage";
import applicationConfig = require("../client/app/applicationconfig");
import {Question} from "../client/app/question";

var express = require('express');
var app = express();
var server = require('http').Server(app);
var session = require('express-session');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
let sessionStorage:SessionStorage = new SessionStorage();

io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('questionRequest', function (quizId, sendNextQuestion) {

        let question:Question;
        if (sendNextQuestion) {
            question = sessionStorage.getNextQuestion(quizId);
        } else {
            question = sessionStorage.getQuestion(quizId);
        }

        socket.broadcast.emit('questionResponse', question, quizId);
        socket.emit('questionResponse', question, quizId);
        let timeRemaining = 0;

        if (sessionStorage.getInterval(quizId) == null) {
            sessionStorage.setInterval(quizId, setInterval(() => {
                timeRemaining += 10;
                if (timeRemaining >= 100) {

                    //Extract to method..
                    let question = sessionStorage.getSolution(quizId);
                    console.log("got check request");
                    socket.broadcast.emit('solutionResponse', question, quizId);
                    socket.emit('solutionResponse', question, quizId);
                    //Extract to method..

                    clearInterval(sessionStorage.getInterval(quizId));
                    sessionStorage.setInterval(quizId, null);
                }
            }, 1000));
        }
    });

    socket.on('solutionRequest', function (quizId, answerId, playerName) {
        sessionStorage.setAnswer(quizId, answerId, playerName);
        console.log(playerName + " registered answer " + answerId + " for quiz " + quizId);
    });

});

//Connections setup
//Can be configured in /client/app/applicationconfig.ts
http.listen(applicationConfig.SOCKET_CONNECTION_PORT, function () {
    console.log('Socket server connected. Listening on port: ' + applicationConfig.SOCKET_CONNECTION_PORT);
});
var io = require('socket.io')(server, {log: false});
server.listen(applicationConfig.HTTP_PORT, function () {
    console.log('HTTP server connected. Listening on port: ' + applicationConfig.HTTP_PORT);
});

//session init
app.use(session({
    secret: 'can',
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client'));

//All angular2 routes should be added here to pass them through
app.use('/quiz/*', express.static(__dirname + '/../client'));
app.use('/tv/*', express.static(__dirname + '/../client'));
app.use('/start', express.static(__dirname + '/../client'));

//Express Node.JS Routes
var Routes = require('../routes.js');
var r = new Routes(app, io);