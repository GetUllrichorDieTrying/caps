'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
console.log(`Running on PORT ${PORT}`);
const Queue = require('./lib/queue');

const server = new Server(PORT);
const caps = server.of('/caps');

const messageQueue = new Queue();

caps.on('connection', (socket) => {
  console.log('Socket is connected to namemspace', socket.id);

  socket.onAny((event, payload) => {
    let time = new Date();
    console.log('Event:', { event, time, payload });
  });
  // join namespace
  socket.on('JOIN', (queueId) => {
    console.log(`Joined the ${queueId} room`);
    socket.join(queueId);
    socket.emit('JOIN', queueId);
  });

  // PICKUP
  socket.on('PICKUP', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);
    if (!currentQueue) {
      let queueKey = messageQueue.store(payload.queueId, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    currentQueue.store(payload.messageId, payload);
    caps.emit('PICKUP', payload);
  });
  // IN-TRANSIT
  socket.on('IN-TRANSIT', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);
    if (!currentQueue) {
      let queueKey = messageQueue.store(payload.queueId, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    currentQueue.store(payload.messageId, payload);
    caps.to(payload.store).emit('IN-TRANSIT', payload);
  });

  // DELIVERED
  socket.on('DELIVERED', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);
    if (!currentQueue) {
      let queueKey = messageQueue.store(payload.queueId, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    currentQueue.store(payload.messageId, payload);
    caps.emit('DELIVERED', payload);
  });

  socket.on('RECEIVED', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);
    if (!currentQueue) {
      throw new Error('No queue created for this message');
    }
    Object.keys(currentQueue.data).forEach((messageId) => {
      console.log('This happens', messageId);
    });
    let message = currentQueue.remove(payload.messageId);
    caps.to(payload.queueId).emit('RECEIVED', message);
  });
});
