var app = require("../server.js");
var path = require("path");
var timesheet = require("./timesheet");
var payroll = require('../payroll/payroll');

var express = require("express");
var router = express.Router();

router.get('/createTimecard', function(request, response) {
    response.sendFile(path.normalize(path.join(__dirname, "..", "public", "timeSheet.html")));
});

router.post('/createTimecard', function (request, response) {
    var id = request.body.currentEmpID;
    timesheet.calculateAndStorePay(request.body.mon, request.body.tues, request.body.wed, request.body.thurs, request.body.fri, request.body.sat, request.body.sun, id);
    payroll.payEmployee(id);
    response.redirect('/');
});



module.exports = router;