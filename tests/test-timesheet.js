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
    employee.hourlyRate = 100000;
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
        employee.save(function () {
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

it('timesheet.calculateAndStorePay() should handle all negative hours', function (done) {
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
    employee.hourlyRate = 100000;
    employee.lastModified = new Date();

    var totalHours = 0;
    var mon = -1;
    var tues = -2;
    var wed = -3;
    var thurs = -4;
    var fri = -5;
    var sat = -6;
    var sun = -7;
    setTimeout(function () {
        employee.save(function () {
            var rtn = timesheet.calculateAndStorePay(mon, tues, wed, thurs, fri, sat, sun, employee.firstName, employee.lastName);
            chai.expect(rtn).to.eql(false);
            done();
        });
    }, 1000);
});

it('timesheet.calculateAndStorePay() should handle some negative hours', function (done) {
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
    employee.hourlyRate = 100000;
    employee.lastModified = new Date();

    var totalHours = 24;
    var mon = -1;
    var tues = 8;
    var wed = -3;
    var thurs = -4;
    var fri = 8;
    var sat = 8;
    var sun = -7;
    setTimeout(function () {
        employee.save(function () {
            var rtn = timesheet.calculateAndStorePay(mon, tues, wed, thurs, fri, sat, sun, employee.firstName, employee.lastName);
            chai.expect(rtn).to.eql(false);
            done();
        });
    }, 1000);
});

it('timesheet.calculateAndStorePay() should handle maximum num of hours in a week', function (done) {
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
    employee.hourlyRate = 100000;
    employee.lastModified = new Date();

    var totalHours = 168;
    var mon = 24;
    var tues = 24;
    var wed = 24;
    var thurs = 24;
    var fri = 24;
    var sat = 24;
    var sun = 24;
    setTimeout(function () {
        employee.save(function () {
            timesheet.calculateAndStorePay(mon, tues, wed, thurs, fri, sat, sun, employee.firstName, employee.lastName,
                function (err, entry) {
                    // Wait for timesheet entry to be saved and returned
                    // Now we can try to find the timesheet entry, recall it, and compare with the original values
                    timesheet.getLatestForEmployee(employee._id, function (err, doc) {
                        if (err) assert(false, "Error trying to find the inserted timesheet");
                        if (doc == null) {
                            assert(false, "Could not find the inserted timesheet");
                        } else {
                            assert.equal(doc.total, totalHours);
                            assert.equal(doc.employeeId, employee._id);
                        }
                        done();
                    });
                }
            );
        });
    }, 1000);
});

it('timesheet.calculateAndStorePay() should handle more than maximum num of hours in a week', function (done) {
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
    employee.hourlyRate = 100000;
    employee.lastModified = new Date();

    var mon = 25;
    var tues = 24;
    var wed = 24;
    var thurs = 24;
    var fri = 24;
    var sat = 24;
    var sun = 24;
    setTimeout(function () {
        employee.save(function () {
            var rtn = timesheet.calculateAndStorePay(mon, tues, wed, thurs, fri, sat, sun, employee.firstName, employee.lastName);
            chai.expect(rtn).to.eql(false);
            done();
        });
    }, 1000);
});

it('timesheet.calculateAndStorePay() should handle zero hours in a week', function (done) {
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
    employee.hourlyRate = 100000;
    employee.lastModified = new Date();

    var totalHours = 0;
    var mon = 0;
    var tues = 0;
    var wed = 0;
    var thurs = 0;
    var fri = 0;
    var sat = 0;
    var sun = 0;
    setTimeout(function () {
        employee.save(function () {
            timesheet.calculateAndStorePay(mon, tues, wed, thurs, fri, sat, sun, employee.firstName, employee.lastName,
                function (err, entry) {
                    // Wait for timesheet entry to be saved and returned
                    // Now we can try to find the timesheet entry, recall it, and compare with the original values
                    timesheet.getLatestForEmployee(employee._id, function (err, doc) {
                        if (err) assert(false, "Error trying to find the inserted timesheet");
                        if (doc == null) {
                            assert(false, "Could not find the inserted timesheet");
                        } else {
                            assert.equal(doc.total, totalHours);
                            assert.equal(doc.employeeId, employee._id);
                        }
                        done();
                    });
                });
        });
    }, 1000);
});

it('timesheet.calculateAndStorePay() should handle more than twenty-four hours worked in a day', function (done) {
    var employee = new employeeModel();

    employee.firstName = "Peter";
    employee.lastName = "Desrosiers";
    employee.position = "Janitor";
    employee.department = "Custodial Engineer";
    employee.street = "272-6 Colony Manor Drive";
    employee.city = "Rochester";
    employee.state = "NY";
    employee.zipcode = 14623;
    employee.gender = "Male";
    employee.dob = "1994-12-19";
    employee.phone = "123-867-5309";
    employee.salary = 9900000;
    employee.lastModified = new Date();

    var totalHours = 60;
    var mon = 36;
    var tues = 4;
    var wed = 4;
    var thurs = 4;
    var fri = 4;
    var sat = 4;
    var sun = 4;
    setTimeout(function () {
        employee.save(function () {
            var rtn = timesheet.calculateAndStorePay(mon, tues, wed, thurs, fri, sat, sun, employee.firstName, employee.lastName);
            chai.expect(rtn).to.eql(false);
            done();
        });
    }, 1000);
});