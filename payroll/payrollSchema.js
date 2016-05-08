/**
 * Created by Nick on 4/29/2016.
 * This is how a payroll will look in the db
 */
var mongoose = require('mongoose');

var payrollSchema = new mongoose.Schema({
    employeeId:{
        type: String,
        required: [true, "Must provide employee ID to create payroll"]
    },
    paycheckAmount:{
        type: Number,
        required: [true, "Must provide paycheck amount to create payroll"]
    },
    datePaid:{
        type: Date,
        required: [true, "Must provide date paid to create payroll"]
    },
    lastModified: Date,
    latest: Boolean
});

module.exports = mongoose.model('Payroll', payrollSchema);