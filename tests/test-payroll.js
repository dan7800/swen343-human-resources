process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var server = require('../server');

var should = chai.should();
var assert = chai.assert;

var employeeClass = require('../employees/employee');
var employeeModel = require('../employees/employeeSchema');
var payroll = require("../payroll/payroll");
var payrollModel = require("../payroll/payrollSchema");

chai.use(chaiHttp);

// Clear the employee and payroll db after each unit test
afterEach(function(done){
    employeeModel.collection.drop();
    payrollModel.collection.drop();
    done();
});


it('There should be stubbed functionality in calculatePayroll', function(done) {
    chai.request(server)
        .get('/api/payroll')
        .end(function(err, res) {
            res.should.have.status(200);
            chai.expect({'Employee Payroll (Current Date)' : Number.MAX_VALUE}).to.eql(res.body);
            done();
        });
});

it('Paying an employee should create a new entry in the payroll table.', function(done) {
    var employee = new employeeModel();

    employee.firstName = "Nick";
    employee.lastName = "James";
    employee.position = "SE";
    employee.department = "Software";
    employee.street = "607 Park Point";
    employee.city = "Rochester";
    employee.state = "NY";
    employee.zipcode = 14623;
    employee.gender = "Male";
    employee.dob = "1995-08-18";
    employee.phone = "123-456-7890";
    employee.salary = 100000;
    employee.lastModified = new Date();
            setTimeout(function () {
    employee.save(function(err, employee) { // Wait for employee entry to be saved and returned
        payroll.payEmployee(employee._id, function() { // Wait for payroll to be inserted into the database
            // Now we can try to find the payroll entry, recall it, and compare with the original employee salary
            payrollModel.findOne({'employeeId': employee._id, 'latest': true}, function (err, entry) {
                if (err) assert(false, "Error trying to find the inserted payroll");
                if (entry == null) {
                    assert(false, "Could not find the inserted payroll");
                } else {
                    assert.equal(employee.salary, entry.paycheckAmount);
                }
                done();
            });
        });
    });},1000);
});

it('There are no entries in the db, so it should return null', function(done) {
            setTimeout(function () {
    payroll.payEmployee(null, function() {
        employeeClass.getSalaryByEmployeeId(null, function (err, obj){
            chai.expect(null).to.eql(obj);
            done();
        });
    });
            },1000);
});

it('Paying an employee should set the last latest field to false, and the newest to true', function(done) {
    var employee = new employeeModel();

    employee.firstName = "Nick";
    employee.lastName = "James";
    employee.position = "SE";
    employee.department = "Software";
    employee.street = "607 Park Point";
    employee.city = "Rochester";
    employee.state = "NY";
    employee.zipcode = 14623;
    employee.gender = "Male";
    employee.dob = "1995-08-18";
    employee.phone = "123-456-7890";
    employee.salary = 100000;
    employee.lastModified = new Date();
        setTimeout(function () {
    employee.save(function(err, employee) { // Wait for employee entry to be saved and returned
        payroll.payEmployee(employee._id, function() { // Wait for 1st payroll to be inserted into the database
            payroll.payEmployee(employee._id, function() { // Wait for 2nd payroll to be inserted into the database
                payrollModel.findOne().sort({lastModified: -1}).exec(function (err, entry) { // Find the most recent entry
                    if (err) assert(false, "Error trying to find the most recent payroll");
                    if (entry == null) {
                        assert(false, "Could not find any payroll entries");
                    } else {
                        assert(entry.latest, "The most recent payroll entry is not marked as the latest");
                    }
                });
                payrollModel.findOne().sort({lastModified: 1}).exec(function (err, entry) { // Find the oldest entry
                    if (err) assert(false, "Error trying to find the oldest payroll");
                    if (entry == null) {
                        assert(false, "Could not find any payroll entries");
                    } else {
                        assert(!entry.latest, "The oldest payroll entry is marked as the latest");
                    }
                    done();
                });
            });
        });
    });},1000);
});
