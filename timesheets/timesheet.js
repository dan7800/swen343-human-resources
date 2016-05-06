/**
 * Created by Nick on 5/4/2016.
 */
var mongoose = require('mongoose');
var timeSheetModel = require('timesheetSchema');
var employeeModel = require('../employees/employeeSchema');

module.exports = {
    calculateAndStorePay: function (mon, tues, wed, thurs, fri, sat, sun, firstName, lastName, dob) {
        // Sum to determine total hours worked
        var totalHours = mon+tues+wed+thurs+fri+sat+sun;
        // Get the employee id
        employeeModel.findOne({'firstName': firstName, 'lastName': lastName, 'dob': new Date(dob)}, function (err, emp) {
            if (err) {
                console.log("Error trying to find the given employee: ", err);
                return false;
            } else if (emp == null) {
                console.log("Could not find the given employee");
                return false;
            } else {
                // Create a new timesheet with this data and save it
                var newTimeSheet = new timeSheetModel();
                newTimeSheet.total = totalHours;
                newTimeSheet.employeeID = emp._id;
                newTimeSheet.dateCreated = Date.now();

                newTimeSheet.save(function (err) {
                    if (err) {
                        console.log("Error saving timesheet in calculateAndStorePay");
                        console.log(err);
                    }
                });
            }
        });
    },

    deleteEntry: function (employeeID, date) {
        var selector = {
            'dateCreated': date,
            'employeeID': employeeID
        };
        timeSheetModel.remove(selector)
    },

    /**
     * Returns all the timesheets associated with the given employee id
     * @param employeeID - Employee to get timesheet history for
     * @param cb - Callback function which has the parameters (err, listOfTimesheets),
     * where listOfTimesheets is the result of the query
     */
    getHoursByEmployeeId: function (employeeID, cb) {
        return timeSheetModel
            .find({'employeeId': employeeID})
            .exec(cb);
    },

    getByEmployeeIdAndDateCreated: function (id, date, cb) {
        return timeSheetModel
            .where('employeeId', id)
            .where('dateCreated', new Date(date))
            .exec(cb);
    },

    getLatestForEmployee: function (id, cb) {
        return timeSheetModel
            .findOne()
            .sort({lastModified: -1})
            .exec(cb);
    }
};