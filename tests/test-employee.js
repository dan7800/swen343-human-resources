process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var server = require('../server');
var should = chai.should();
var assert = chai.assert;

var employeeModel = require('../employees/employeeSchema');

chai.use(chaiHttp);

// Clear the employee db after each unit test
afterEach(function(done){
    employeeModel.collection.drop();
    done();
});

it('/createEmployee should create a new employee in the mongodb database', function(done) {
    var req = {};
    req.firstName = "Noah";
    req.lastName = "Frank";
    req.position = "SE";
    req.department = "Software Development";
    req.streetAddress = "53 Tucan Lane";
    req.city = "Rochester";
    req.state = "New York";
    req.zipCode = 14623;
    req.gender = "Male";
    req.DOB = "1995-05-18";
    req.phone = "124-321-5234";
    req.salary = 100000;

    chai.request(server)
        .post('/createEmployee')
        .send(req)
        .end(function(err, res) {
            res.should.have.status(200);
            employeeModel.findOne({ 'firstName': req.firstName, 'lastName': req.lastName }, function (err, emp) {
                if (err) assert(false, "Error trying to find the inserted employee: " + err);
                if (emp == null) {
                    assert(false, "Could not find the inserted employee");
                }else {
                    assert.equal(req.firstName, emp.firstName);
                    assert.equal(req.lastName, emp.lastName);
                    assert.equal(req.position, emp.position);
                    assert.equal(req.department, emp.department);
                    assert.equal(req.streetAddress, emp.street);
                    assert.equal(req.city, emp.city);
                    assert.equal(req.state, emp.state);
                    assert.equal(req.zipCode, emp.zipcode);
                    assert.equal(req.gender, emp.gender);
                    assert.equal((new Date(req.DOB)).toString(), emp.dob.toString());
                    assert.equal(req.phone, emp.phone);
                    assert.equal(req.salary, emp.salary);
                }
                done();
            })
        });
});

it('/createEmployee should not create a new employee in the mongodb database', function(done) {
    var req = {};
    req.firstName = "";
    req.lastName = "";
    req.position = "SE";
    req.department = "Software Development";
    req.streetAddress = "53 Tucan Lane";
    req.city = "Rochester";
    req.state = "New York";
    req.zipCode = 14623;
    req.gender = "Male";
    req.DOB = "1995-05-18";
    req.phone = "124-321-5234";
    req.salary = 100000;

    chai.request(server)
        .post('/createEmployee')
        .send(req)
        .end(function(err, res) {
            res.should.have.status(200);
            employeeModel.findOne({ 'firstName': req.firstName, 'lastName': req.lastName }, function (err, emp) {
                if (err) assert(True, "Employee was not created" + err);
                done();
            })
        });
});


