'use strict';

var express = require('express'),
  router = express.Router(),
  Connection = require('../models/connection.js'),
  isLoggedIn = require('./helpers/loggedin.js');


router.get('/', isLoggedIn, function(req, res) {
  var email = req.user.local.email;

  Connection.find({email1: email}, function(err, connections) {
    if(err) {
      return res.send(err);
    }

    if (connections.length === 0) {
      connections = [{
        "name2": "No connections found"
      }];
    }

    res.render('profile.hbs', {
      name: req.user.local.name,
      email: req.user.local.email,
      isAuthenticated: req.isAuthenticated(),
      isAdmin: req.user.local.admin,
      connections: connections
    });
  });
});

module.exports = router;
