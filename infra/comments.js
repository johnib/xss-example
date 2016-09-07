'use strict';

const uuid = require('uuid');
const log = require('./logger');
const db = require('./db');

//noinspection JSUnusedLocalSymbols
/**
 * An express middleware for logging a new transaction to the db.
 * @param req
 * @param res
 * @param next
 */
function logMiddleware(req, res, next) {
  const props = req.body;
  props.time = Date.now();
  props.id = uuid.v4();

  log.info(`logging new comment:\t${JSON.stringify(props)}`);
  db.putRecord(props.id, props);

  next();
}

function getAllComments() {
  return db.getAllRecords();
}

module.exports.log = logMiddleware;
module.exports.getAll = getAllComments;