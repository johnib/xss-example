'use strict';

/** configurations */
const PORT = process.env.PORT || 1234;

/** deps */
const log = require('./infra/logger')
  , express = require('express')
  , morgan = require('morgan')
  , bodyParser = require('body-parser');

/** express */
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/*', (req, res) => {
  log.warning(JSON.stringify(req.query));
  res.status(200).end();
});

/** start */
app.listen(PORT, () => {
  log.info(`listening on http://localhost:${PORT}`);
});