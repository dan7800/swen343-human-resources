var mongoose = require('mongoose');
var employeeModel = require('./employee');
mongoose.connect('mongodb://localhost:27017/employees');
module.exports = {
    createEntry: function (first, last, job, department, streetAddress, city, state, zipcode, gender, dob, phone, salary) {
        var info = {
            'firstName': first,
            'lastName': last,
            'position': job,
            'department': department,
            'streetAddress': streetAddress,
            'city': city,
            'state': state,
            'zipcode': zipcode,
            'gender': gender,
            'dob': dob,
            'phone': phone,
            'salary': salary,
            'lastModified': Date.now()
        };
        employeeModel.insert(info);
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
        return mongoose.model('Employee')
            .findById(id)
            .select('salary')
            .exec(cb);
    }
};

