'use strict';


// import the moongoose helper utilities
var utils = require('../utils');
var should = require('should');

var User = require('../../models/user')

describe('User: models', function () {
  describe('#create()', function () {
    it('should create a new User', function (done) {
      // Create a User object to pass to User.create()
      var user = new User();

      var u = {
        local: {
          name: 'test',
          email: 'test@test.test',
          admin: false,
          password: user.generateHash('testtest')
        }
      };

      User.create(u, function (err, createdUser) {
        // error should not exist
        should.not.exist(err);

        // verify that the returned user is what we expect
        createdUser.local.name.should.equal('test');
        createdUser.local.email.should.equal('test@test.test');

        // tests are done
        done();
      });
    });
  });
});
