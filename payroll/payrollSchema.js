/**
 * Created by Nick on 4/29/2016.
 */
var mongoose = require('mongoose');
var Employee = require('../employees/employee')

var payrollSchema = new mongoose.Schema({
    employeeId: String,
    paycheckAmount: Number,
    datePaid: Date,
    lastModified: Date,
    lastest: Boolean
});

module.exports = mongoose.model('Payroll', payrollSchema);