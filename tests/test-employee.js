process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var server = require('../server');
var should = chai.should();
var assert = chai.assert;


var employeefunct = require('../employees/employee');
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
    req.hourlyRate = 100000;
    
    setTimeout(function () {
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
                    assert.equal(req.hourlyRate, emp.hourlyRate);
                }
                done();
            })
        });},1000);
});

it('/createEmployee should not create a new employee in the mongodb database', function(done) {
var employee = new employeeModel();

    employee.firstName = "";
    employee.lastName = "";
    employee.position = "SE";
    employee.department = "Software";
    employee.street = "607 Park Point";
    employee.city = "Rochester";
    employee.state = "NY";
    employee.zipcode = 14623;
    employee.gender = "Male";
    employee.dob = "1995-08-18";
    employee.phone = "123-456-7890";
    employee.hourlyRate = 100000;
    employee.lastModified = new Date();

    setTimeout(function () {
    employee.save(function(err, employee) { // Wait for employee entry to be saved and returned
        if (err){
            assert(true, "Employee was not created:" + err);
        }
        done();
    });},1000);
        
});


it('/delete employee should remove employee from db', function(done) {
    var employee = new employeeModel();

    employee.firstName = "Joe";
    employee.lastName = "Schmoe";
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
        employee.save(function (err, employee) {
            var temp = employee._id;
            employeefunct.deleteEntry(temp, function (err, entry) {
                if(err){
                    assert(false, 'Error in deleting');
                }
                else{
                    assert(true, 'Deleted');
                }
                employeeModel.findById(temp, function (err, entry) {
                    chai.expect(entry).to.eql(null);

                    done();
                });
            });
        });
    }, 1000);
});

it('/updating employee info', function(done) {
    var employee = new employeeModel();

    employee.firstName = "Joe";
    employee.lastName = "Schmoe";
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
    setTimeout(function () {
        employee.save(function (err, employee) {
            var tempPos = employee.position;
            var tempFN = employee.firstName;
            var tempLN = employee.lastName;
            employeefunct.updateEntry(employee._id, 'Jose', 'Schmose', 'CS','Software', '607 Park Point', 'Rochester', 'NY', 14623, 'Male', '1995-08-18', '123-456-7890', 100000, function(err, entry){
                if(entry.firstName != tempFN && entry.lastName != tempLN && employee.position != tempPos){
                    assert(true, 'Employee info has been changed');
                }
                if(err){
                    assert(false, 'Error in updating info');
                }
                else{
                    assert(false, 'Info is unchanged');
                }
            });
            done();
        });
    }, 1000);
});


    /*
    setTimeout(function () {
            var temp = employee._id
            employeefunct.deleteEntry(employee._id, function(done){
                if (employeeModel.findById(temp) == null){
                    assert(true, "Employee Joe was removed")
                }
                else{
                    assert(false, "Employee Joe was not removed")
                }


            done();
        });},1000);

});



*/

