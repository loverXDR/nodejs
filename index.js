var express = require('express');
var app = require ('express')();
var server = require ('http').createServer(app);
var io = require('socket.io')(server); 
var fs = require ('fs')
server.listen(3000)

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});


// массивы хранения
users = [];
connections = [];

io.on('connection', socket => {
    fs.appendFile("./log.txt",`${new Date().toString()} ${socket.id.toString()} connection\n`, err =>{ if (err) {
        console.error(err);
        }});
    
    console.log(socket.id)
    connections.push(socket);
    socket.on('disconnect', data => {
        connections.splice(connections.indexOf(socket),1)
        fs.appendFile("./log.txt",`${new Date().toString()} ${socket.id.toString()} dissconnect\n`, err =>{ if (err) {
            console.error(err);
            }});
    });
    socket.on('send mess', data => {
        io.emit('add mess', {mess: data.mess, name: data.name});
        fs.appendFile("./log.txt",`${new Date().toString()} ${socket.id.toString()} new message\n`, err =>{ if (err) {
            console.error(err);
            }});
    });
    socket.on("connect", () => {
        console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
      });
    
});
