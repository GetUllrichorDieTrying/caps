'use strict';

const eventPool = require('../../eventPool');

eventPool.on('PICKUP', driverEvent);

function driverEvent(payload) {
  console.log(`DRIVER: picked up ${payload.orderID}`);
  console.log(`DRIVER: delivered ${payload.orderID}`);
  eventPool.emit('DELIVERED', payload);
}
