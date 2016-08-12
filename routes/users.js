'use strict';

var express = require('express'),
  router = express.Router(),
  _ = require('underscore'),
  Connection = require('../models/connection.js'),
  isLoggedIn = require('./helpers/loggedin.js');

router.get('/', isLoggedIn, function(req, res, next) {
  if (!req.user.local.admin) {
    res.redirect('/');
  }

  Connection.find({}).sort({name1: 1, name2: 1}).exec(function(err, connections) {

    var connectionsList = [];

    connections.forEach(function(connection) {
      var index = _.findIndex(connectionsList, function(item) { return item.name == connection.name1 })

      if (index === -1) {
        var userConnection = {
          name: connection.name1,
          email: connection.email1,
          conns: []
        }

        var conn = {
          name2: connection.name2,
          email2: connection.email2,
        };

        userConnection.conns.push(conn);

        connectionsList.push(userConnection);
      } else {

        var conn = {
          name2: connection.name2,
          email2: connection.email2
        };

        connectionsList[index].conns.push(conn);
      }
    });

    console.log(connectionsList);

    res.render('users.hbs', {
      connections: connectionsList,
      isAuthenticated: req.isAuthenticated(),
      isAdmin: req.user.local.admin,
    });
  });
});

module.exports = router;
