var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/employees')

function Employee() {
    function createEntry(first, last, job, department, streetAddress, city, state, zipcode, gender, dob, phone, salary){
        var info = {
            'firstName' : first,
            'lastName' : last,
            'position' : job,
            'department' : department,
            'streetAddress' : streetAddress,
            'city' : city,
            'state' : state,
            'zipcode' : zipcode,
            'gender' : gender,
            'dob' : dob,
            'phone' : phone,
            'salary' : salary,
            'lastModified' : new Timestamp()
        };
        db.employees.insert(info);
    }

    function updateEntry(first, last, map) {
        var selector = {
            'firstName' : first,
            'lastName' : last
        };
        db.employees.update(selector,
            {
                $set: map,
                $currentDate:{'lastModified' : true}
            }
        );
    }

    function deleteEntry(first, last) {
        var selector = {
            'firstName' : first,
            'lastName' : last
        };
        db.employees.remove(selector)
    }
}