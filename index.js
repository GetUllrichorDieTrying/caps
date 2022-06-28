'use strict';

const eventPool = require('./eventPool');
require('./driver');
require('./vendor');

// log events
eventPool.on('ORDER', (payload) => logger('ORDER', payload));
eventPool.on('PICKUP', (payload) => logger('PICKUP', payload));
eventPool.on('DELIVERED', (payload) => logger('DELIVERED', payload));

function logger(event, payload) {
  let time = new Date();
  console.log('EVENT', { event, time, payload });
}
