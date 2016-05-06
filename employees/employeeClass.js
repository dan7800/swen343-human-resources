var mongoose = require('mongoose');
var employeeModel = require('./employee');
var db = require('../connection').employeeDb;
module.exports = {
    createEntry: function (first, last, job, department, streetAddress, city, state, zipcode, gender, dob, phone, salary) {
        var employee = new employeeModel();

        employee.firstName = first;
        employee.lastName = last;
        employee.position = job;
        employee.department = department;
        employee.street = streetAddress;
        employee.city = city;
        employee.state = state;
        employee.zipcode = zipcode;
        employee.gender = gender;
        employee.dob = dob;
        employee.phone = phone;
        employee.salary = salary;
        employee.lastModified = Date.now();

        employee.save(function(err) {
            if (err) {
                console.log("Error saving employee in createEntry");
                console.log(err);
            }
        });
    },

    updateEntry: function (first, last, map) {
        var selector = {
            'firstName': first,
            'lastName': last
        };
        employeeModel.update(selector,
            {
                $set: map,
                $currentDate: {'lastModified': true}
            }
        );
    },

    deleteEntry: function (first, last) {
        var selector = {
            'firstName': first,
            'lastName': last
        };
        employeeModel.remove(selector)
    },

    getSalaryByEmployeeId: function (id, cb) {
        return db.model('Employee')
            .findById(id)
            .select('salary')
            .exec(cb);
    }
};

