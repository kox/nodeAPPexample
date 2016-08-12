'use strict';

var express = require('express'),
  passport = require('passport'),
  router = express.Router();


router.get('/', function(req, res, next) {
  var admin = false;
  if (req.isAuthenticated() && req.user.local.admin) {
    admin = true;
  }

  res.render('index', {
    title: 'nodeAPPexample',
    isAuthenticated: req.isAuthenticated(),
    isAdmin: admin });
});

router.use('/connect', require('./connect.js'));
router.use('/login', require('./login.js'));
router.use('/register', require('./register.js'));
router.use('/profile', require('./profile.js'));
router.use('/users', require('./users.js'));

module.exports = router;
