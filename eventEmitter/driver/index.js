'use strict';

const eventPool = require('../eventPool');

eventPool.on('PICKUP', driverEvent);

function driverEvent(payload) {
  console.log(`DRIVER: picked up ${payload.orderId}`);
  console.log(`DRIVER: delivered ${payload.orderId}`);
  eventPool.emit('DELIVERED', payload);
}
