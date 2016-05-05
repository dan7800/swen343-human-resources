var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var payrollDb = mongoose.connect('mongodb://localhost:27017/payroll');
var server = require('../server');
var Employee = require('../employees/employee');
var should = chai.should();
var assert = chai.assert;

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

    var EmpModel = mongoose.model("Employee");
    var employee = new EmpModel(employeeInfo);
    employee.save();

    payroll.payEmployee(employee.id);
    var query = Employee.getSalaryByEmployeeId(employee.id, function (err, obj){
        assert(obj['salary'], employee.salary);
        done();
    });
});