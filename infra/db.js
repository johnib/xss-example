'use strict';

/** deps */
const fs = require('fs');
const q = require('q');
const path = require('path');
const log = require('./logger');

/** constants */
const db_file = process.env.DB_FILE || 'db.json';
const db_directory = process.env.DB_DIR || __dirname;
const db_path = path.join(db_directory, db_file);
log.debug(`db file set to:\t${db_path}`);

/** promisify */
const writeFile = q.nbind(fs.writeFile);

/** properties */
let db;

/** private methods */
(function init() {
  try {
    db = JSON.parse(fs.readFileSync(db_path));
    log.info('db loaded');

  } catch (err) {
    log.warning(`could not load db file due to:\t${err.message}`);
    log.info(`creating a new db at:\t${db_path}`);

    db = {};
  }
})();

function persistDb() {
  writeFile(db_path, JSON.stringify(db))
    .catch(err => {
      log.error(`Persisting db failed due to:\t${err.message}`);

      // retry - not implemented
      // report of failed after all - not implemented
    });
}

/** public methods */
function putRecord(key, value) {
  db[key] = value;
  persistDb();
}

function getAllRecords() {
  return Object.keys(db).map(key => db[key]);
}

module.exports = {
  putRecord: putRecord,
  getAllRecords: getAllRecords
};