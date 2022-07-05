'use strict';

const messageClient = require('./vendorClient');
const { io } = require('socket.io-client');

jest.mock('socket.io-client', () => {
  return {
    io: jest.fn(() => {
      return {
        on: jest.fn(),
        emit: jest.fn(),
      };
    }),
  };
});

describe('Client Test', () => {
  test('Call socket function on instantiation', () => {
    jest.clearAllMocks();
    let client = new messageClient('test');
    expect(io).toHaveBeenCalledWith('JOIN', { queueId: 'test' });
    expect(client.socket.on).toHaveBeenCalled();
  });
});
