/**
 * Created by Nick on 5/4/2016.
 * This is how a timesheet will look in the db
 */

var mongoose = require('mongoose');

var timesheetSchema = new mongoose.Schema({
    employeeId: String,
    total: Number,
    dateCreated: Date
});

module.exports = mongoose.model("Timesheet", timesheetSchema);