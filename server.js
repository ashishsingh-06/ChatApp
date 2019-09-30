const express = require('express');
const app = express();
const socket = require('socket.io');
const http = require('http');


const port = process.env.PORT||5000;
const server = app.listen(port,()=>{

        console.log(`server started on ${port}` );
        
});


// static files;
app.use(express.static('public'));


// socket setup
const io = socket(server);

io.on('connection',(socket)=>{
    
        //console.log('made socket connection',socket.id);

        socket.on('chat',function(data){
                
                io.sockets.emit('chat',data);
        });

        socket.on('typing',function(data){

                socket.broadcast.emit('typing',data);

        });
        
});