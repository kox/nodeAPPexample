'use strict';

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

// Create module
module.exports = function(passport) {
  // We setup the library
  // User Serialization
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // User Deserialization
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // Register Strategy
  passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req, email, password, done) {
    process.nextTick(function() {
      User.findOne({ 'local.email':  email }, function(err, user) {
        if (err) {
          return done(err);
        }

        if (user) {
          req.session.flash = {};
          return done(null, false,
            req.flash('registerMessage',
            'That email is already taken.'));
        } else {
          var newUser = new User();

          newUser.local.email = email;
          newUser.local.name = req.body.name;
          newUser.local.password = newUser.generateHash(password);
          newUser.local.admin = 0;

          newUser.save(function(err) {
            if (err) {
              return done(null, false, req.flash('registerMessage', 'Validation error.'));
            }

            return done(null, newUser);
          });
        }
      });
    });
  }));

  // Login Strategy
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req, email, password, done) {
    User.findOne({ 'local.email':  email }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        req.session.flash = {};
        return done(null, false, req.flash('loginMessage', 'No user found.'));
      }

      if (!user.validPassword(password)) {
        req.session.flash = {};
        return done(null, false, req.flash('loginMessage', 'Wrong password.'));
      }

      return done(null, user);
    });
  }));
};
