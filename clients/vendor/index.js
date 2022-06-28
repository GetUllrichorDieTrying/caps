'use strict';

const eventPool = require('../../eventPool');
const order = require('../../chance');

// console.log(order);
eventPool.on('DELIVERED', delivered);

function delivered(payload) {
  console.log('VENDOR: THANK YOU FOR DELIVERING OUR ORDER:', payload.orderID);
}

setInterval(() => {
  eventPool.emit('PICKUP', order);
}, 3000);

module.exports = delivered;
