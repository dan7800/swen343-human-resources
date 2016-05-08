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

