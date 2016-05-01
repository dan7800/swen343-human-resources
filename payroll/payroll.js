/**
 * This file handles the payroll of employees.
 */
var mongoose = require('mongoose');
var payrollDb = mongoose.createConnection('mongodb://localhost:27017/payroll').db;
var employeeDb = mongoose.createConnection('mongodb://localhost:27017/employees').db;
payrollDb.on('error', console.error.bind(console, 'connection error:'));
employeeDb.on('error', console.error.bind(console, 'connection error:'));
payrollDb.once('open', function() {
    console.log("Established mongodb connection");
});
employeeDb.once('open', function() {
    console.log("Established mongodb connection");
});
module.exports.payEmployee = function(id){
    var paycheck = (employeeDb.find({id: id}).select('salary'))/52;
    var info = {
        employeeId: id,
        paycheckAmount: paycheck,
        datePaid: new Date(),
        lastModified: new Date(),
        lastest: true
    };
    payrollDb.insert(info)
};

/**
 * Calculates the amount of money that is needed to pay all of the employees
 * (Currently Stubbed)
 * @returns {number} - The amount of money needed to pay employees
 */
module.exports.calculatePayroll = function () {
    return {"Employee Payroll (Current Date)" : Number.MAX_VALUE};
};

