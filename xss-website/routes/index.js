'use strict';

/** deps */
const express = require('express')
  , router = express.Router()
  , log = require('../infra/logger')
  , comments = require('../infra/comments');

/** routes */
router.get('/', (req, res) => {
  res.render('comments', {action: "/add-comment", comments: comments.getAll()});
});

router.post('/add-comment', comments.log, (req, res) => {
  res.redirect('/');
});

log.info('all INDEX routes are set up');

module.exports = router;
