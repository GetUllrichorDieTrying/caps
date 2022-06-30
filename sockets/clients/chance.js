'use strict';

const Chance = require('chance');
const chance = new Chance();

module.exports = {
  store: 'The Money Making Group',
  orderId: chance.guid(),
  customer: chance.name(),
  address: chance.address(),
};
