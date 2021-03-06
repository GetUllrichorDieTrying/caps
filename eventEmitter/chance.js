'use strict';

const Chance = require('chance');
const chance = new Chance();

let order = {
  store: chance.company(),
  orderId: chance.guid(),
  customer: chance.name(),
  address: chance.address(),
};

module.exports = order;
