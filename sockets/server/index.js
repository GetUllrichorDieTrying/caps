'use strict';

require('dotenv').config();
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3002;
console.log(`Running on PORT ${PORT}`);

const server = new Server(PORT);
// console.log('SERVER', server);

const caps = server.of('/caps');

server.on('connection', (socket) => {
  // console.log(socket.id);
  console.log('Socket is connected to Event Server', socket.id);

  socket.on('MESSAGE', (payload) => {
    console.log('Server MESSSAGE event', payload);
    // socket.emit('MESSAGE', payload);
    // server.emit('MESSAGE', payload);
    socket.broadcast.emit('MESSAGE', payload);
  });

  socket.on('RECEIVED', (payload) => {
    console.log('Server RECEIVED event ', payload);
    socket.broadcast.emit('RECEIVED', payload);
  });
});

caps.on('connection', (socket) => {
  console.log('Connected to namespace', socket.id);
});
