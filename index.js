var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

//beow if for chat messaging
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

//below is for textarea update in myFormEdit
io.on('connection', function(socket){
  socket.on('textarea update', function(msg){
    console.log('textarea update: ' + msg);
  });
});

io.on('connection', function(socket){
  socket.on('textarea update', function(msg){
    io.emit('textarea update', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
