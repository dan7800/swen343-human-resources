/**
 * This file handles the payroll of employees.
 */
var Payroll = require('./payrollSchema');
var Employee = require('../employees/employee');

module.exports.payEmployee = function (id, cb) {
    Employee.getHourlyRateByEmployeeId(id, function (err, obj) {
        if (obj != null) { // If we found an employee
            Payroll.findOneAndUpdate({'employeeId': id, 'latest': true}, {'latest': false}, function(err, doc){
                if (err){
                    console.log("Could not update latest payroll entry to {latest: false} due to ", err);
                }
            });
            var newPayroll = new Payroll();
            newPayroll.employeeId = id;
            newPayroll.paycheckAmount = obj['hourlyRate'];
            newPayroll.datePaid = new Date();
            newPayroll.lastModified = new Date();
            newPayroll.latest = true;

            newPayroll.save(new function (error, data) {
                if (error) {
                    assert.equal(error.errors['employeeId'].message, "Must provide employee ID to create payroll");
                    assert.equal(error.errors['paycheckAmount'].message, "Must provide paycheck amount to create payroll");
                    assert.equal(error.errors['datePaid'].message, "Must provide date paid to create payroll");
                    console.log("Could not save new payroll due to error", error);
                }
            });
        }
        cb();
    });
};

/**
 * Calculates the amount of money that is needed to pay all of the employees
 * (Currently Stubbed)
 * @returns {number} - The amount of money needed to pay employees
 */
module.exports.calculatePayroll = function () {
    return {"Employee Payroll (Current Date)": Number.MAX_VALUE};
};

