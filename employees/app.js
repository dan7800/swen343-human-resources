/**
 * Created by Lexie Infantino on 5/1/2016.
 */

var app = require("../server.js");
var path = require("path");
var Employee = require("./employee");

var express = require("express");
var router = express.Router();

router.get('/', function(request, response) {
    response.sendFile(path.normalize(path.join(__dirname, "..", "public", "listEmployees.html")));
});

router.get('/createEmployee', function(request, response) {
    response.sendFile(path.normalize(path.join(__dirname, "..", "public", "addEmployee.html")));
});

router.post('/createEmployee', function(request, response) {
    Employee.createEntry(request.body.firstName, request.body.lastName, request.body.position, request.body.department, request.body.streetAddress, request.body.city, request.body.state, request.body.zipCode, request.body.gender, request.body.DOB, request.body.phone, request.body.salary)
    response.sendFile(path.join(__dirname, "..", "public", "listEmployees.html"));
});

module.exports = router;