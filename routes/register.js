'use strict';

var express = require('express'),
  router = express.Router(),
  passport = require('passport');


router.get('/', function(req, res) {
  var messages = (req.session.flash) ? req.session.flash.registerMessage : '';

  res.render('register.hbs', { errorMessage: messages });
});

router.post('/', passport.authenticate('local-register', {
  successRedirect: '/profile',
  failureRedirect: '/register',
  failureFlash: true
}));

module.exports = router;
