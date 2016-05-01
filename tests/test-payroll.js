var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var server = require('../server');
var should = chai.should();
var assert = chai.assert;

var payroll = require('../payroll/payroll');

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

it('Paying an employee should create a new entry in the payroll table.', function(done) {
    var req = {};
    req.body = {};
    req.body.firstName = "Nick";
    req.body.lastName = "James";
    req.body.position = "SE";
    req.body.department = "Software Development";
    req.body.street = "607 Park Point Dr";
    req.body.city = "Rochester";
    req.body.state = "New York";
    req.body.zipcode = 14623;
    req.body.gender = "Male";
    req.body.dob = "1995-08-18";
    req.body.phone = "124-321-5234";
    req.body.salary = 100000;
    req.body.lastModified = Date.now();
    chai.request(server).post('/api/employees');

    Payroll.payEmployee(1);

    payroll.findById(1, function (err, doc){
        //assert(doc.)
    });
});