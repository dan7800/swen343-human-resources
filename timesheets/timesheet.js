/**
 * Created by Nick on 5/4/2016.
 */
var mongoose = require('mongoose');
var timeSheetModel = require('timesheetSchema');


module.exports = {
    calculatePay: function (mon, tues, wed, thurs, fri, sat, sun, empID) {
        var total = mon+tues+wed+thurs+fri+sat+sun;
        var info = {
            'total':total,
            'employeeID':empID,
            'dateCreated':Date.now()
        };
        timeSheetModel.insert(total);
    },



    deleteEntry: function (date, employeeID) {
        var selector = {
            'dateCreated': date,
            'employeeID': employeeID
        };
        timeSheetModel.remove(selector)
    },

    getHoursByEmployeeId: function (id) {
        return mongoose.model('')
            .findById(id)
            .select('salary')
            .exec(cb);
    }
};