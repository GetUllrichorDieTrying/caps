'use strict';

const eventPool = require('./eventPool');
require('../sockets/clients/driver');
require('../sockets/clients/vendor');

// log events
eventPool.on('ORDER', (payload) => logger('ORDER', payload));
eventPool.on('PICKUP', (payload) => logger('PICKUP', payload));
eventPool.on('DELIVERED', (payload) => logger('DELIVERED', payload));

function logger(event, payload) {
  let time = new Date();
  console.log('EVENT', { event, time, payload });
}
