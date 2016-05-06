/**
 * Created by Nick on 4/29/2016.
 * This is how a payroll will look in the db
 */
var mongoose = require('mongoose');

var payrollSchema = new mongoose.Schema({
    employeeId: String,
    paycheckAmount: Number,
    datePaid: Date,
    lastModified: Date,
    latest: Boolean
});

module.exports = mongoose.model('Payroll', payrollSchema);