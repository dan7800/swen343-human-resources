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
afterEach(function(done){
    employeeModel.collection.drop();
    timeSheetModel.collection.drop();
    done();
});

it('timesheet.calculateAndStorePay() should create a new timecard in the mongodb database', function(done) {
    var newTimeSheet = new timeSheetModel();

    var currentTime = new Date();
    var totalHours = 40;
    var employeeID = '123';
    newTimeSheet.total = totalHours;
    newTimeSheet.employeeId = employeeID;
    newTimeSheet.dateCreated = currentTime;

    newTimeSheet.save(function (err) {
        if (err) {
            console.log("Error saving timesheet in calculateAndStorePay");
            console.log(err);
        }
    });

    newTimeSheet.save(function(err, timesheet) { // Wait for timesheet entry to be saved and returned
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
});