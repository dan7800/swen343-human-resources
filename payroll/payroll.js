/**
 * This file handles the payroll of employees.
 */
var Payroll = require('./payrollSchema');
var Employee = require('../employees/employee');

var http = require('http');
var querystring = require('querystring');

module.exports.payEmployee = function (id, cb) {
    Employee.getSalaryByEmployeeId(id, function (err, obj) {
        if (obj != null) { // If we found an employee
            Payroll.findOneAndUpdate({'employeeId': id, 'latest': true}, {'latest': false}, function (err, doc) {
                if (err) {
                    console.log("Could not update latest payroll entry to {latest: false} due to ", err);
                }
            });
            var newPayroll = new Payroll();
            newPayroll.employeeId = id;
            newPayroll.paycheckAmount = obj['salary'];
            newPayroll.datePaid = new Date();
            newPayroll.lastModified = new Date();
            newPayroll.latest = true;

            newPayroll.save(new function (error, data) {
                if (error) {
                    console.log("Could not save new payroll due to error", error);
                }
            });
        }
        cb();
    });
};

module.exports.postToAccounting = function(fName, lName, paycheck) {
    // Build the post string from an object
    var desc = 'Employee payroll for ' + fName + ' ' + lName;
    var post_data = querystring.stringify({
        apiKey: 'human_resources',
        pay: paycheck,
        description: desc
    });

    // An object of options to indicate where to post to
    var post_options = {
        host: 'localhost',
        port: '6969',
        path: '/payroll',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(post_data)
        }
    };

    // Set up the request
    var post_req = http.request(post_options, function(res) {
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
    });
    
    // post the data
    post_req.write(post_data);
    post_req.end();
};