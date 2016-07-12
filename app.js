var express = require('express');
var app = express();
var server = require('http').Server(app);
var session = require('express-session');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
    console.log('a user connected');
});

http.listen(8000, function(){
    console.log('listening on *:3000');
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

app.use( express.static(__dirname + '/client' ) );

function serveIndex(req, res) {
    return res.sendFile(__dirname + '/client/');
}

//All angular2 routes should be added here to pass them through
app.get('/quiz', serveIndex);
app.get('/start', serveIndex);

//Express Node.JS Routes
var Routes = require('./routes.js');
var r = new Routes(app, io);
