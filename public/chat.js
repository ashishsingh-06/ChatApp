const socket = io.connect('http://localhost:5000');

//Query DOM
const message = document.getElementById('message');
const handle = document.getElementById('handle');
const button = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

//Emit events

button.addEventListener('click',function(){
    socket.emit('chat',{
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress',function(){

    socket.emit('typing',handle.value);
});

// listen to events
socket.on('chat',function(data){
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});

socket.on('typing',function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});