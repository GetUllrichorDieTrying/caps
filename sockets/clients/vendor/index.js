'use strict';

const order = require('../chance');

const { io } = require('socket.io-client');
// acknowledge a connection, no subscriptions have occurred yet
const socket = io('http://localhost:3001/caps');
const handleReceived = require('./handleReceived');

socket.emit('JOIN', order.store);
socket.on('DELIVERED', handleReceived);

setInterval(() => {
  socket.emit('PICKUP', order);
}, 3000);
