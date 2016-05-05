/**
 * This file handles the payroll of employees.
 */
var mongoose = require('mongoose');
var Payroll = require('./payrollSchema');
var Employee = require('../employees/employeeClass');

module.exports.payEmployee = function(id){
    var paycheck = (Employee.getSalaryByEmployeeId(id, function (err, obj) {
        console.log(err);
        console.log(obj);
        var info = {
            employeeId: id,
            paycheckAmount: obj['salary'],
            datePaid: new Date(),
            lastModified: new Date(),
            lastest: true
        };
        var newPayroll = new Payroll(info);
        newPayroll.save(new function(error, data){
            if(error){
                //res.json(error);
                console.log("Could not save due to error", error);
            }
            else{
                // res.json(data);
                console.log("Saved payroll successfully")
            }
        });
    }));
};

/**
 * Calculates the amount of money that is needed to pay all of the employees
 * (Currently Stubbed)
 * @returns {number} - The amount of money needed to pay employees
 */
module.exports.calculatePayroll = function () {
    return {"Employee Payroll (Current Date)" : Number.MAX_VALUE};
};

