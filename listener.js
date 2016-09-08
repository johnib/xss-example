'use strict';

/** configurations */
const SERVER_PORT = process.env.PORT || 1234;
const WEB_SOCKET_PORT = process.env.WEBSOCKET_PORT || 8001;

/** deps */
const log = require('./infra/logger')
  , express = require('express')
  , morgan = require('morgan')
  , ws = require('nodejs-websocket')
  , bodyParser = require('body-parser');

/** express */
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/*', (req, res) => {
  log.warning(JSON.stringify(req.query));
  res.status(200).end();
});

/** websocket */
const websocket = ws.createServer(connection => {
  log.info(`New connection from ${connection.headers.origin} - ID: ${connection.key}`);
  connection.on('text', text => {
    log.warning(`${connection.key}: ${text}`);
  });

  connection.on('close', () => {
    log.info(`Disconnect: client ${connection.headers.origin}`);
  });

  connection.on('error', (err) => {
    log.error(`Connection Error: client ${connection.headers.origin}, message: ${err.message}`);
  })
});

/** start */
app.listen(SERVER_PORT, () => {
  log.info(`Web server listening on http://localhost:${SERVER_PORT}`);
});

websocket.listen(WEB_SOCKET_PORT, () => {
  log.info(`Websockets listening on ws://localhost:${WEB_SOCKET_PORT}`);
});