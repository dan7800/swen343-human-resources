/**
 * Created by Nick on 5/4/2016.
 */
var mongoose = require('mongoose');
var timeSheetModel = require('./timesheetSchema');
var employeeModel = require('../employees/employeeSchema');

module.exports = {
    calculateAndStorePay: function (mon, tues, wed, thurs, fri, sat, sun, empID, cb) {
        for (var i = 0; i < 7; i++){ // 7 for the days of the week - the first 7 args
            if (Number(arguments[i]) < 0) {
                console.log("Negative number was entered");
                return false;
            }
        }


        // Sum to determine total hours worked
        var totalHours = Number(mon)+Number(tues)+Number(wed)+Number(thurs)+Number(fri)+Number(sat)+Number(sun);

        if (totalHours > 168) { // If the value exceeds the amount of hours in a week, display an error
            console.log("Total number of hours is too high");
            return false;
        } else if (totalHours < 0){
            console.log('Total number of hours is too low');
            return false;
        }


        //Determine if more than 24 Hours have been worked in a single day.
        for(var x = 0; x < 7; x++){// 7 for the days of the week - the first 7 args
            if(Number(arguments[x]) > 24){
                console.log("More than 24 hours worked in a single day");
                return false;
            }
        }


        // Get the employee id
        employeeModel.findById(empID, function (err, emp) {
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
                        if(cb)
                        {
                            cb();
                        }

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
    },
    
    getHoursByEmployeeId: function (employeeId, cb) {
        return timeSheetModel
            .findOne({'employeeId' : employeeId})
            .sort({dateCreated: -1})
            .select('total')
            .exec(cb)
    }
};