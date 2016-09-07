'use strict';

/** configurations */
const PORT = process.env.PORT || 3000;

/** deps */
const log = require('./infra/logger')
  , express = require('express')
  , path = require('path')
  , morgan = require('morgan')
  , bodyParser = require('body-parser');

/** express */
const app = express()
  , indexRoutes = require('./routes/index')
  , xssRoutes = require('./routes/xss');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use('/css', express.static('css'));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', indexRoutes);
app.use('/xss', xssRoutes);

/** start */
app.listen(PORT, () => {
  log.info(`listening on http://localhost:${PORT}`);
});