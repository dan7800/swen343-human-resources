process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var server = require('../server');
var should = chai.should();
var assert = chai.assert;

var employeeModel = require('../employees/employeeSchema');
var timeSheetModel = require('../timesheets/timesheetSchema');

var timesheet = require('../timesheets/timesheet');

chai.use(chaiHttp);

// Clear the employee db after each unit test
afterEach(function (done) {
    employeeModel.collection.drop();
    timeSheetModel.collection.drop();
    done();
});

it('Create a new timecard in the mongodb database', function (done) {
    var newTimeSheet = new timeSheetModel();

    var currentTime = new Date();
    var totalHours = 40;
    var employeeID = '123';
    newTimeSheet.total = totalHours;
    newTimeSheet.employeeId = employeeID;
    newTimeSheet.dateCreated = currentTime;
    setTimeout(function () {
        newTimeSheet.save(function (err, timesheet) { // Wait for timesheet entry to be saved and returned
            // Now we can try to find the timesheet entry, recall it, and compare with the original values
            timeSheetModel.findById(timesheet._id, function (err, entry) {
                if (err) assert(false, "Error trying to find the inserted timesheet");
                if (entry == null) {
                    assert(false, "Could not find the inserted timesheet");
                } else {
                    assert.equal(currentTime.toString(), entry.dateCreated.toString());
                    assert.equal(totalHours, entry.total);
                    assert.equal(employeeID, entry.employeeId);
                }
                done();
            });
        });
    }, 1000);
});

it('timesheet.calculateAndStorePay() should create a new timecard in the mongodb database', function (done) {
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

    var totalHours = 40;
    var mon = 8;
    var tues = 8;
    var wed = 8;
    var thurs = 8;
    var fri = 8;
    var sat = 0;
    var sun = 0;
    setTimeout(function () {
        employee.save(function(){
            timesheet.calculateAndStorePay(mon, tues, wed, thurs, fri, sat, sun, employee.firstName, employee.lastName,
                function (err, entry) {
                    // Wait for timesheet entry to be saved and returned
                    // Now we can try to find the timesheet entry, recall it, and compare with the original values
                    timesheet.getLatestForEmployee(employee._id, function (err, doc) {
                        if (err) assert(false, "Error trying to find the inserted timesheet");
                        if (doc == null) {
                            assert(false, "Could not find the inserted timesheet");
                        } else {
                            assert.equal(totalHours, doc.total);
                            assert.equal(employee._id, doc.employeeId);
                        }
                        done();
                    });
                }
            );
        });
    }, 1000);
});