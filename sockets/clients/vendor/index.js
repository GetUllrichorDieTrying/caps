'use strict';

const VendorClient = require('./vendorClient');

const Chance = require('chance');
const chance = new Chance();

let acmeVendor = new VendorClient('acme-widgets');
let flowerVendor = new VendorClient('1-555-flowers');

setInterval(() => {
  let order = {
    store: 'acme-widgets',
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };
  acmeVendor.publish('PICKUP', { messageId: order.orderId, order });
}, 3000);

setInterval(() => {
  let order = {
    store: '1-555-flowers',
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };
  flowerVendor.publish('PICKUP', { messageId: order.orderId, order });
}, 5000);

acmeVendor.subscribe('DELIVERED', (payload) => {
  console.log('VENDOR: Thank you for delivering order', payload.orderId);
});

acmeVendor.subscribe('DELIVERED', (payload) => {
  console.log('VENDOR: Thank you for delivering order', payload.orderId);
});

flowerVendor.subscribe('RECEIVED', (payload) => {
  console.log('VENDOR: Thank you for MESSAGES FROM QUEUE', payload.orderId);
});

flowerVendor.subscribe('RECEIVED', (payload) => {
  console.log('VENDOR: Thank you for MESSAGES FROM QUEUE', payload.orderId);
});
