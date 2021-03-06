var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

    io.emit('connections',Object.keys(io.sockets.connected).length);

  socket.on('disconnect', () => {
    //console.log('a user disconnect');
  });

  socket.on('Created', (data) => {
    socket.broadcast.emit('Created',(data));
  });

  socket.on('chat-message', (data) => {
    socket.broadcast.emit('chat-message',(data));
  });

  socket.on('user-typing', (data) => {
    socket.broadcast.emit('user-typing',(data));
  });

  socket.on('user-stopTyping', (data) => {
    socket.broadcast.emit('user-stopTyping',(data));
  });

  socket.on('joined', (data) => {
    socket.broadcast.emit('joined',(data));
  });

  socket.on('leaved', (data) => {
    socket.broadcast.emit('leaved', (data));
  });

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});