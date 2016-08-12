'use strict';


// import the moongoose helper utilities
var utils = require('../utils');
var should = require('should');

var Connection = require('../../models/connection')


describe('Connection: models', function () {
  describe('#create()', function () {
    it('should create a new Connection', function (done) {
      var c = {
        name1: 'test1',
        email1: 'test1@test.test',
        name2: 'test2',
        email2: 'test2@test.test'
      };

      Connection.create(c, function (err, createdConnection) {
        // error should not exist
        should.not.exist(err);

        // verify that the returned is what we expect
        createdConnection.name1.should.equal('test1');
        createdConnection.name2.should.equal('test2');

        // test are done
        done();
      });
    });
  });
});
