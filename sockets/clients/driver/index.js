'use strict';

const DriverClient = require('./driverClient');

let acmeDriver = new DriverClient('acme-widgets');
let flowerDriver = new DriverClient('1-555-flowers');

acmeDriver.subscribe('PICKUP', (payload) => {
  setTimeout(() => {
    console.log(`DRIVER: picked up order ${payload.orderId}`);
    acmeDriver.publish('IN-TRANSIT', payload);
  }, 1000);

  setTimeout(() => {
    console.log(`DRIVER: delivered order ${payload.orderId}`);
    acmeDriver.publish('DELIVERED', payload);
  }, 3000);
});

flowerDriver.subscribe('PICKUP', (payload) => {
  setTimeout(() => {
    console.log(`DRIVER: picked up order ${payload.orderId}`);
    flowerDriver.publish('IN-TRANSIT', payload);
  }, 1000);

  setTimeout(() => {
    console.log(`DRIVER: delivered order ${payload.orderId}`);
    flowerDriver.publish('DELIVERED', payload);
  }, 3000);
});
