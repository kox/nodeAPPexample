'use strict';

var mongoose = require('mongoose');

var connectionSchema = mongoose.Schema({
  email1: String,
  name1: String,
  email2: String,
  name2: String
});

connectionSchema.index({email1: 1});

var Connection = mongoose.model('Connection', connectionSchema);

module.exports = Connection;
