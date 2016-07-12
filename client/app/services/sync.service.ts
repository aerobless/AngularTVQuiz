import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class SyncService implements OnInit{

    socket = io('http://localhost:8000');

    ngOnInit() {
    }

    requestQuestion(){
        this.socket.on('greetings', function(message, id){
            console.log( 'Got a message from the server: "' + message + "', my ID is: " + id );
        }.bind(this));

        this.socket.on("connect", function () {
            console.log("Connected!");
        });
    }
}