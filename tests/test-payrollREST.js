var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var server = require('../server');
var should = chai.should();
var assert = chai.assert;

var employee = require('../employees/employee');

chai.use(chaiHttp);

it('There should be stubbed funcionality in calculatePayroll', function(done) {
    chai.request(server)
        .get('/api/payroll')
        .end(function(err, res) {
            res.should.have.status(200);
            assert.equal(JSON.parse(res.body), Number.MAX_VALUE);
            done();
        });
});