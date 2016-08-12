'use strict';

var express = require('express'),
  router = express.Router(),
  Connection = require('../models/connection'),
  User = require('../models/user'),
  isLoggedIn = require('./helpers/loggedin.js');

router.get('/', isLoggedIn, function(req, res) {
  res.render('connect.hbs', {
    isAuthenticated: req.isAuthenticated(),
    isAdmin: req.user.local.admin,
    message: req.flash('connectMessage')
  });
});


router.post('/', isLoggedIn, function(req, res, next) {
  var name1 = req.user.local.name;
  var name2 = req.body.search;

  if (name1 === name2) {
    return res.render('connect.hbs', {
      isAuthenticated: req.isAuthenticated(),
      errorMessage: ['You only can connect with another users.']});
  }

  User.findOne({'local.name': name2}, function(err, user) {
    if(err) {
      return res.render('connect.hbs', {
        isAuthenticated: req.isAuthenticated(),
        isAdmin: req.user.local.admin,
        errorMessage: err });
    }

    if (!user) {
      return res.render('connect.hbs', {
        isAuthenticated: req.isAuthenticated(),
        isAdmin: req.user.local.admin,
        errorMessage: ['No user found.'] });
    }

    var connectUser = {
      name: user.local.name,
      email: user.local.email,
      connected: 0
    }

    Connection.count({ name1: name1, name2: name2}, function(err, count) {
      if (count === 1) {
        connectUser.connected = 1
      }

      res.render('connect.hbs', {
        connect: connectUser,
        isAuthenticated: req.isAuthenticated(),
        isAdmin: req.user.local.admin,
        errorMessage: req.flash('connectMessage')});
    });
  });
});

router.get('/add', isLoggedIn, function(req, res) {
  if ((!req.query) || (!req.query.email) || (!req.query.name)) {
    res.render('connect.hbs', {
      isAuthenticated: req.isAuthenticated(),
      isAdmin: req.user.local.admin,
      errorMessage: ['Wrong query parameters']
    });
  }

  var connection = new Connection({
    name1: req.user.local.name,
    email1: req.user.local.email,
    name2: req.query.name,
    email2: req.query.email,
  });

  connection.save(function(err, data) {
    if (err) {
      res.render('connect.hbs', {
        isAuthenticated: req.isAuthenticated(),
        isAdmin: req.user.local.admin,
        errorMessage: err
      });
    }

    res.render('connect.hbs', {
      isAuthenticated: req.isAuthenticated(),
      isAdmin: req.user.local.admin,
      successMessage: ['Connection added']
    });
  });
});

router.get('/del', isLoggedIn, function(req, res) {
  if ((!req.query) || (!req.query.email) || (!req.query.name)) {
    res.render('connect.hbs', {
      isAuthenticated: req.isAuthenticated(),
      isAdmin: req.user.local.admin,
      errorMessage: ['Wrong query parameters']
    });
  }

  var connection = {
    name1: req.user.local.name,
    email1: req.user.local.email,
    name2: req.query.name,
    email2: req.query.email,
  };

  Connection.remove(connection, function(err) {
    if(err) {
      res.render('connect.hbs', {
        isAuthenticated: req.isAuthenticated(),
        isAdmin: req.user.local.admin,
        errorMessage: err
      });
    }

    res.render('connect.hbs', {
      isAuthenticated: req.isAuthenticated(),
      isAdmin: req.user.local.admin,
      successMessage: ['Connection deleted']
    });
  });
});

module.exports = router;
