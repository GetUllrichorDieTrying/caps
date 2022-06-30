'use strict';

require('dotenv').config();
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3002;
console.log(`Running on PORT ${PORT}`);

const server = new Server(PORT);
const caps = server.of('/caps');

caps.on('connection', (socket) => {
  // console.log(socket.id);
  console.log('Socket is connected to namemspace', socket.id);

  // join namespace
  socket.on('JOIN', (room) => {
    console.log(`Joined ${room} room`);
    socket.join(room);
  });
  // PICKUP
  socket.on('PICKUP', (payload) => {
    logger('PICKUP', payload);
    caps.emit('PICKUP', payload);
  });
  // IN-TRANSIT
  socket.on('IN-TRANSIT', (payload) => {
    logger('IN-TRANSIT', payload);
    caps.to(payload.store).emit('IN-TRANSIT', payload);
  });

  // DELIVERED
  socket.on('DELIVERED', (payload) => {
    logger('DELIVERED', payload);
    caps.to(payload.store).emit('DELIVERED', payload);
  });
});

function logger(event, payload) {
  let time = new Date();
  console.log('EVENT', { event, time, payload });
}
