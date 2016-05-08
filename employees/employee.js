var mongoose = require('mongoose');
var employeeModel = require('./employeeSchema');
var assert = require('assert');

module.exports = {
    createEntry: function (first, last, job, department, streetAddress, city, state, zipcode, gender, dob, phone, hourlyRate) {
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
        employee.hourlyRate = hourlyRate;
        employee.lastModified = Date.now();

        employee.save(function(err) {
            if (err) {
                assert.equal(err.errors['firstName'].message, "Must provide employee's first name");
                console.log("Error saving employee in createEntry");
                console.log(err);
            }
        });
    },

    updateEntry: function (id, first, last, job, department, streetAddress, city, state, zipcode, gender, dob, phone, hourlyRate, cb) {
        var emp = employeeModel.findById(id);
        emp.firstName = first;
        emp.lastName = last;
        emp.position = job;
        emp.department = department;
        emp.street = streetAddress;
        emp.city = city;
        emp.state = state;
        emp.zipcode = zipcode;
        emp.gender = gender;
        emp.dob = dob;
        emp.phone = phone;
        emp.hourlyRate = hourlyRate;
        emp.lastModified = Date.now();
        emp.update();
    },

    deleteEntry: function (id, cb) {
        employeeModel.remove({"_id":id}, function (err, entry) {
            cb(err, entry);
        });
        
    },

    getHourlyRateByEmployeeId: function (id, cb) {
        return employeeModel
            .findById(id)
            .select('hourlyRate')
            .exec(cb);
    }
};

