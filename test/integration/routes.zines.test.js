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

  describe('GET /api/zines', () => {
    it('should list ALL zines', (done) => {
      chai.request(server)
        .get('/api/zines')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(3);
          done();
        });
    });
  });
});
