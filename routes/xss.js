'use strict';

/** deps */
const express = require('express')
  , router = express.Router()
  , log = require('../infra/logger')
  , fs = require('fs')
  , comments = require('../infra/comments');

/** routes */
router.get('/', generateHtml, (req, res) => {
  res.send(req.html);
});

router.post('/add-comment', comments.log, (req, res) => {
  res.redirect('/xss');
});

//noinspection JSUnusedLocalSymbols
/** middlewares */
function generateHtml(req, res, next) {
  let html = fs.readFileSync('htmls/index.html').toString();
  const commentsHtml = comments.getAll()
    .reduce((prev, current) => {
      return prev.concat(`<div>${current.text}</div>`)
    }, "");

  req.html = html.replace("<%= comments %>", commentsHtml);
  next();
}

log.info('all XSS routes are set up');

module.exports = router;
