var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var server = require('../server');
var should = chai.should();
var assert = chai.assert;

var employee = require('../employees/employee');

chai.use(chaiHttp);

it('employee.createEntry() should create a new document in the mongodb database', function(done) {
    var req = {};
    req.body = {};
    req.body.firstName = "Noah";
    req.body.lastName = "Frank";
    req.body.position = "SE";
    req.body.department = "Software Development";
    req.body.street = "53 Tucan Lane";
    req.body.city = "Rochester";
    req.body.state = "New York";
    req.body.zipcode = 14623;
    req.body.gender = "Male";
    req.body.dob = "1995-05-18";
    req.body.phone = "124-321-5234";
    req.body.salary = 100000;
    req.body.lastModified = Date.now();
    chai.request(server)
        .post('/api/employees')
        .send(req)
        .end(function(err, res) {
            res.should.have.status(200);
            employee.findById(res.body.data._id, function (err, doc){
                assert.equal(req.body.firstName, doc.firstName);
                assert.equal(req.body.lastName, doc.lastName);
                done();
            });
        });
});