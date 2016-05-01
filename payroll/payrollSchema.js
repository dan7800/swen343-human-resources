/**
 * Created by Nick on 4/29/2016.
 */
var mongoose = require('mongoose');

var payrollSchema = new mongoose.Schema({
    employeeId: Long,
    paycheckAmount: Number,
    datePaid: Date,
    lastModified: Date
});

module.exports = mongoose.model('Payroll', payrollSchema);