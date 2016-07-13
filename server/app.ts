/// <reference path="../typings/index.d.ts" />
import {SessionStorage} from "./sessionstorage";

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

});

http.listen(8000, function(){
    console.log('listening on *:8000');
});

var io = require('socket.io')(server,{log:false});

server.listen(9999,function(){
    console.log("Server connected. Listening on port: 9999");
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