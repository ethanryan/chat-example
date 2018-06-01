// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

//adding below based on Heroku example: https://github.com/heroku-examples/node-socket.io/blob/master/server.js
'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on port: ${ PORT }`));

const io = socketIO(server); //note: the Socket.io server takes an HTTP server as an argument so that it can listen for socket.io-related requests

// io.on('connection', (socket) => {
//   console.log('Client connected');
//   socket.on('disconnect', () => console.log('Client disconnected'));
// });
//

setInterval(() => io.emit('time', new Date().toTimeString()), 1000); //pushing out the current time on the server once a second, without waiting for a client's request

//////above from Heroku example...

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

//beow if for chat messaging
io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
  });
});

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });
});

//below is for textarea update in myFormEdit
io.on('connection', function(socket) {
  socket.on('textarea update', function(msg) {
    console.log('textarea update: ' + msg);
  });
});

io.on('connection', function(socket) {
  socket.on('textarea update', function(msg) {
    io.emit('textarea update', msg);
  });
});
