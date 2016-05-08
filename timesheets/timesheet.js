/**
 * Created by Nick on 5/4/2016.
 */
var mongoose = require('mongoose');
var timeSheetModel = require('./timesheetSchema');
var employeeModel = require('../employees/employeeSchema');

module.exports = {
    calculateAndStorePay: function (mon, tues, wed, thurs, fri, sat, sun, firstName, lastName, cb) {
        // Sum to determine total hours worked
        var totalHours = Number(mon)+Number(tues)+Number(wed)+Number(thurs)+Number(fri)+Number(sat)+Number(sun);

        if (totalHours < 0 || totalHours > 168) { // If the value exceeds the amount of hours in a week, display an error
            console.log("Total number of hours is too high");
            return false;
        }
        // Get the employee id
        employeeModel.findOne({'firstName': firstName, 'lastName': lastName}, function (err, emp) {
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
                newTimeSheet.employeeId = emp._id;
                newTimeSheet.dateCreated = new Date;

                newTimeSheet.save(function (err) {
                    if (err) {
                        console.log("Error saving timesheet in calculateAndStorePay");
                        console.log(err);
                    } else {
                        cb();
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
    getByEmployeeId: function (employeeID, cb) {
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
            .findOne({'employeeId': id})
            .sort({dateCreated: -1})
            .exec(cb);
    }
};