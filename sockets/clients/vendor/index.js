'use strict';

const Chance = require('chance');
const chance = new Chance();

const { io } = require('socket.io-client');
// acknowledge a connection, no subscriptions have occurred yet
const socket = io('http://localhost:3002');

const createSendMessage = require('./sendMessage');
const handleReceived = require('./handleReceived');
const sendMessage = createSendMessage(socket);

socket.on('RECEIVED', handleReceived);

setInterval(() => {
  sendMessage(`Hi ${chance.first()}`);
}, 3000);

// 'use strict';

// const eventPool = require('../../../eventEmitter/eventPool');
// const order = require('../../../eventEmitter/chance');

// eventPool.on('DELIVERED', delivered);

// function delivered(payload) {
//   console.log('VENDOR: THANK YOU FOR DELIVERING OUR ORDER:', payload.orderID);
// }

// setInterval(() => {
//   eventPool.emit('PICKUP', order);
// }, 3000);

// module.exports = delivered;
