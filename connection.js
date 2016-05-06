var mongoose = require('mongoose');

var payrollDb = mongoose.createConnection('mongodb://localhost:27017/payroll');
var employeeDb = mongoose.createConnection('mongodb://localhost:27017/employees');

module.exports.payrollDb = payrollDb;
module.exports.employeeDb = employeeDb;
