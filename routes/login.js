'use strict';

var express = require('express'),
  router = express.Router(),
  passport = require('passport');

router.get('/', function(req, res, next) {
  var messages = (req.session.flash) ? req.session.flash.loginMessage : '';

  res.render('login.hbs', { errorMessage: messages });
});

router.post('/', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));

router.get('/out', function(req, res) {
  req.session.destroy(function (err) {
    res.redirect('/');
  });
});

module.exports = router;

