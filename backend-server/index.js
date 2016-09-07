var app = require('http').createServer()
var io = require('socket.io')(4000);

io.on('connection', function (socket) {
  socket.emit('news', { title: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

