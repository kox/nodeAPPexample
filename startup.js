#!/usr/bin/env node

var mongoose = require('mongoose'),
 User = require('./models/user'),
 configDB = require('./config/database.js');

mongoose.connect(configDB.url);

var newUser = new User();

newUser.local.email = 'admin@admin.admin';
newUser.local.name = 'admin';
newUser.local.password = newUser.generateHash('adminadmin');
newUser.local.admin = true;

newUser.save(function(err) {
  if (err) {
    console.log(err)
  }

  console.log('admin user created');

  process.exit(1);
});


