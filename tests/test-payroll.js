var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var server = require('../server');
var Employee = require('../employees/employee');
var EmployeeClass = require('../employees/employeeClass');
var should = chai.should();
var assert = chai.assert;
var DatabaseCleaner = require('database-cleaner');
var databaseCleaner = new DatabaseCleaner('mongodb');

var payroll = require("../payroll/payroll");


chai.use(chaiHttp);

it('There should be stubbed funcionality in calculatePayroll', function(done) {
    chai.request(server)
        .get('/api/payroll')
        .end(function(err, res) {
            res.should.have.status(200);
            chai.expect({'Employee Payroll (Current Date)' : Number.MAX_VALUE}).to.eql(res.body);
            done();
        });
});

it('Paying an employee should create a new entry in the payroll table.', function(done) {
    var connection = require('../connection');
    var employeeInfo = {
        firstName: "Nick",
        lastName: "James",
        position: "SE",
        department: "Software",
        street: "607 Park Point",
        city: "Rochester",
        state: "NY",
        zipcode: 14623,
        gender: "Male",
        dob: "1995-08-18",
        phone: "123-456-7890",
        salary: 100000,
        lastModified: new Date()
    };

    var EmpModel = connection.employeeDb.model('Employee');
    var employee = new EmpModel(employeeInfo);
    employee.save();
    payroll.payEmployee(employee.id);
    EmployeeClass.getSalaryByEmployeeId(employee.id, function (err, obj){
        assert(obj['salary'], employee.salary);
        databaseCleaner.clean(connection.payrollDb.db, function () {
            connection.payrollDb.close();
        });
        databaseCleaner.clean(connection.employeeDb.db, function () {
            connection.employeeDb.close();
        });
        done();
    });
});

it('There are no entries in the db, so it should return null', function(done) {
    var connection = require('../connection');
    payroll.payEmployee(null);
    EmployeeClass.getSalaryByEmployeeId(null, function (err, obj){
        chai.expect(null).to.eql(obj);
        connection.employeeDb.close();
        connection.payrollDb.close();
        done();
    });
});

it('Paying an employee should set the last latest field to false, and the newest to true', function(done) {
    var connection = require('../connection');
    var employeeInfo = {
        firstName: "Nick",
        lastName: "James",
        position: "SE",
        department: "Software",
        street: "607 Park Point",
        city: "Rochester",
        state: "NY",
        zipcode: 14623,
        gender: "Male",
        dob: "1995-08-18",
        phone: "123-456-7890",
        salary: 100000,
        lastModified: new Date()
    };

    var EmpModel = connection.employeeDb.model("Employee");
    var employee = new EmpModel(employeeInfo);
    employee.save();
    payroll.payEmployee(employee.id);
    payroll.payEmployee(employee.id);
    connection.payrollDb.model('Payroll').find({}, function(err, docs) {
       if (!err) {
           console.log(docs.length);
       }
    });
    connection.payrollDb.model('Payroll').where('employeeId', employee.id).select('latest').exec(function(err, obj){
        console.log(obj);
        chai.expect(obj).to.have.length.above(1);
        done();
    })

});
