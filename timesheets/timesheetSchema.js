/**
 * Created by Nick on 5/4/2016.
 * This is how a timesheet will look in the db
 */

var mongoose = require('mongoose');

var timesheetSchema = new mongoose.Schema({
    employeeId:{
        type: String,
        require : [true, "Employee ID is required to create a timecard"]
    },
    total:{
        type: Number,
        require: [true, "Total number of hours is required to create a timecard"],
        min: [0, "Hours must be positive"],
        max: [168, "Hours must be less than 168"]
    },
    dateCreated: Date
});

module.exports = mongoose.model("Timesheet", timesheetSchema);