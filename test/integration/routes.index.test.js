process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var server = require('../../server/server');

describe('routes : index', function () {
  beforeEach(function (done) {
    done();
  });

  afterEach(function (done) {
    done();
  });
});
