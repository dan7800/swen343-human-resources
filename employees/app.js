/**
 * Created by Lexie Infantino on 5/1/2016.
 */

var app = require("../server.js")
var employee = require("employeeClass.js")
var timeCard = require("timesheet")


app.post('/createEmployee', function(request, response){
    //console.log(request.body.name);
    //console.log(request.body.email);
    employee.createEntry(request.body.firstName, request.body.lastName, request.body.position, request.body.department, request.body.streetAddress, request.body.city, request.body.state, request.body.zipCode, request.body.gender, request.body.DOB, request.body.phone, request.body.salary)
    
});

app.post('/createTimecard', function (request, response) {
    timeCard.calculatePay(request.body.mon, request.body.tues, request.body.wed, request.body.thurs, request.body.fri, request.body.sat, request.body.sun, request.body.empID);
})

