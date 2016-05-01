/**
 * Created by Nick on 4/29/2016.
 */
var mongoose = require('mongoose');

var payrollSchema = new mongoose.Schema({
    employeeId: Number,
    paycheckAmount: Number,
    datePaid: Date,
    lastModified: Date,
    lastest: Boolean
});

this.statics.findByEmployeeId = function (id, cb) {
    return this.find({ employeeId: id, latest: true}, cb);
};

module.exports = mongoose.model('Payroll', payrollSchema);