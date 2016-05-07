var app = require("../server.js");
var path = require("path");
var timesheet = require("./timesheet");

var express = require("express");
var router = express.Router();

router.get('/createTimecard', function(request, response) {
    response.sendFile(path.normalize(path.join(__dirname, "..", "public", "timeSheet.html")));
});

router.post('/createTimecard', function (request, response) {
    timesheet.calculateAndStorePay(request.body.mon, request.body.tues, request.body.wed, request.body.thurs, request.body.fri, request.body.sat, request.body.sun, request.body.firstName, request.body.lastName, request.body.DOB);
    response.sendFile(path.join(__dirname, "..", "public", "listEmployees.html"));
});

module.exports = router;