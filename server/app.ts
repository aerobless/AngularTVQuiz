/// <reference path="../typings/index.d.ts" />
import {SessionStorage} from "./sessionstorage";
import {ApplicationConfig} from "../client/app/applicationconfig";

var express = require('express');
var app = express();
var server = require('http').Server(app);
var session = require('express-session');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
let sessionStorage:SessionStorage = new SessionStorage();

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on( 'questionRequest', function( quizId ){ //TODO: define contract
        
        let question = sessionStorage.getNextQuestion(quizId);

        socket.broadcast.emit( 'questionResponse', question, quizId);
        socket.emit( 'questionResponse', question, quizId);
    });

    socket.on( 'registerPlayerRequest', function( quizId ){ //TODO: define contract
        let question = sessionStorage.getQuestion(quizId);

        socket.broadcast.emit( 'questionResponse', question, quizId);
        socket.emit( 'questionResponse', question, quizId);
    });

    socket.on( 'solutionRequest', function( quizId, answerId, playerName ){ //TODO: define contract
        sessionStorage.setAnswer(quizId, answerId, playerName);
        console.log(playerName+" registered answer "+answerId+" for quiz "+quizId);
    });

    socket.on( 'checkRequest', function( quizId){ //TODO: define contract
        let question = sessionStorage.getSolution(quizId);
        console.log("got check request");
        socket.broadcast.emit( 'solutionResponse', question, quizId);
        socket.emit( 'solutionResponse', question, quizId);
    });

});

//Connections setup
//Can be configured in /client/app/applicationconfig.ts
http.listen(ApplicationConfig.SOCKET_CONNECTION_PORT, function(){
    console.log('Socket server connected. Listening on port: '+ApplicationConfig.SOCKET_CONNECTION_PORT);
});
var io = require('socket.io')(server,{log:false});
server.listen(ApplicationConfig.HTTP_PORT,function(){
    console.log('HTTP server connected. Listening on port: '+ApplicationConfig.HTTP_PORT);
});

//session init
app.use( session({
    secret:'can',
    resave:false,
    saveUninitialized:false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

app.use( express.static(__dirname + '/../client' ) );

//All angular2 routes should be added here to pass them through
app.use('/quiz/*', express.static(__dirname + '/../client' ));
app.use('/tv/*', express.static(__dirname + '/../client' ));
app.use('/start', express.static(__dirname + '/../client' ));

//Express Node.JS Routes
var Routes = require('../routes.js');
var r = new Routes(app, io);