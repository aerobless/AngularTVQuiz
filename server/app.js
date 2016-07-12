"use strict";
var express = require('express');
var app = express();
var server = require('http').Server(app);
var session = require('express-session');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
let questionState = 0;
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('questionRequest', function (quizId) {
        questionState++;
        if (questionState == QUESTIONS.length) {
            questionState = 0;
        }
        let question = QUESTIONS[questionState];
        socket.broadcast.emit('questionResponse', question, quizId);
        socket.emit('questionResponse', question, quizId);
    });
});
const QUESTIONS = [
    { text: 'An apple a day keeps the ___ away', answers: [{ text: 'doctor', correct: true }, { text: 'cat', correct: false }, { text: 'ghost', correct: false }, { text: 'alien', correct: false }] },
    { text: 'What is the name of the highest mountain in the world', answers: [{ text: 'Mount Everest', correct: true }, { text: 'Matterhorn', correct: false }] },
    { text: 'When was Google founded?', answers: [{ text: 'September 4, 1998', correct: true }, { text: 'August 19, 1985', correct: false }, { text: 'September 15, 1997', correct: false }] },
    { text: 'What was the name of the first apple computer?', answers: [{ text: 'Apple I', correct: true }, { text: 'Apple One', correct: false }, { text: 'A1', correct: false }] }
];
http.listen(8000, function () {
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
