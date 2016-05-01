var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/employees');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Established mongodb connection");
});

exports.employee = function() {
    exports.createEntry = function createEntry(first, last, job, department, streetAddress, city, state, zipcode, gender, dob, phone, salary) {
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
        db.employees.insert(info);
    };

    exports.updateEntry = function updateEntry(first, last, map) {
        var selector = {
            'firstName': first,
            'lastName': last
        };
        db.employees.update(selector,
            {
                $set: map,
                $currentDate: {'lastModified': true}
            }
        );
    };

    exports.deleteEntry = function deleteEntry(first, last) {
        var selector = {
            'firstName': first,
            'lastName': last
        };
        db.employees.remove(selector)
    };
};

