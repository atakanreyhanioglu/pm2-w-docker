const app = require('express')();
const http = require('http').Server(app);
const Socketio = require('socket.io')
const redisAdapter = require('socket.io-redis');
const port = process.env.PORT || 3000;

io = Socketio(http, {
  cors: {
    origins: ['*'],
    methods: ['GET', 'POST'],
  },
  transports: ['websocket'],
});

io.adapter(redisAdapter({
  host: 'redis',
  port: 6379,
}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.emit('welcome', { message: `User cluster pID = ${process.pid}` });
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
