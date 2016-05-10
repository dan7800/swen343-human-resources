/**
 * This file handles the payroll of employees.
 */
var Payroll = require('./payrollSchema');
var Employee = require('../employees/employee');
var Timesheet = require('../timesheets/timesheet');
var employeeModel = require('../employees/employeeSchema');

var request = require("request");


var postToAccounting = module.exports.postToAccounting = function(id, paycheck) {
    // Get employee name
    employeeModel.findById(id, function(err, emp) {
        if (err) {
            return false;
        }
        // Build the post string from an object
        var desc = 'Employee payroll for ' + emp.firstName + ' ' + emp.lastName;

        var options = { method: 'POST',
            url: 'http://vm343a.se.rit.edu:6969/payroll',
            qs: { apiKey: 'human_resources', pay: paycheck, description: desc },
            headers:
            {  'cache-control': 'no-cache' } };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log("Response", body);
        });
    });
};


module.exports.payEmployee = function (id, cb) {
    Employee.getHourlyRateByEmployeeId(id, function (err, obj) {
        if (obj != null) { // If we found an employee
            Payroll.findOneAndUpdate({'employeeId': id, 'latest': true}, {'latest': false}, function (err, doc) {
                if (err) {
                    console.log("Could not update latest payroll entry to {latest: false} due to ", err);
                }
            });
            Timesheet.getHoursByEmployeeId(id, function (err, timesheet){
                var newPayroll = new Payroll();
                newPayroll.employeeId = id;
                newPayroll.paycheckAmount = obj['hourlyRate'] * timesheet['total'];
                newPayroll.datePaid = new Date();
                newPayroll.lastModified = new Date();
                newPayroll.latest = true;
                newPayroll.save(function (error, data) {
                    if (error) {
                        console.log("Could not save new payroll due to error", error);
                    }
                    if (data == null) {
                        console.log("Failed to get payroll after saving it");
                    } else {
                        postToAccounting(id, data.paycheckAmount);
                    }
                    
                    if (cb) {
                        cb();
                    }
                });
                
            });
        } else if (cb){
            cb();
        }
    });
};