# caps

## Project Description

The Code Academy Parcel Service (CAPS) tracks deliveries utilizing the caps app utilizing Socket.io.

## Deployments

[Production](https://gudt-caps.herokuapp.com/)

## Author

- Dylan Ullrich

### Setup

#### .env Requirements

- `PORT=3001`

#### Run

- Use `nodemon`

#### Features and Routes

- Track events and get alerts during different parts of the delivery cycle.
- There is a server queue that is used to deliver messages after a user returns online.
- The Driver and Vendor constantly communicate with the server to let users know when and where deliveries are happening.
