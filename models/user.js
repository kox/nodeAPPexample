'use strict';

var mongoose = require('mongoose'),
  validate = require('mongoose-validator'),
  bcrypt   = require('bcrypt-nodejs');

var passValidator = [
  validate({
    validator: 'isLength',
    arguments: [5, 200],
    message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters'
  })
];

var userSchema = mongoose.Schema({
  local: {
    name: { type: String, unique: true },
    email: { type: String, unique: true },
    password: {
      type: String,
      validate: passValidator
    },
    admin: { type: Boolean, default: false}
  },
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
