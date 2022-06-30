'use strict';

const { io } = require('socket.io-client');
// acknowledge a connection, no subscriptions have occurred yet
const socket = io('http://localhost:3001/caps');

socket.on('PICKUP', (payload) => {
  setTimeout(() => {
    console.log(payload);
    console.log(`DRIVER: picked up order ${payload.orderId}`);
    socket.emit('IN-TRANSIT', payload);
  }, 1000);

  setTimeout(() => {
    console.log(`DRIVER: delivered order ${payload.orderId}`);
    socket.emit('DELIVERED', payload);
  }, 3000);
});
