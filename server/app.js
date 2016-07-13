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
        let question = sessionStorage.getQuestion(quizId);
        console.log("QTEXT" + question.text);
        socket.broadcast.emit('questionResponse', question, quizId);
        socket.emit('questionResponse', question, quizId);
    });
});
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
