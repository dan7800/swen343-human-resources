//Lets require/import the HTTP module
var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Models
var Employee = require('./employees/employeeSchema');
var Timesheet = require('./timesheets/timesheetSchema');

// Routers
var employeeRouter = require("./employees/app");
var timesheetRouter = require("./timesheets/app");

// Config
var config = require('./_config');

var app = express();

// Setup database with config file
mongoose.connect(config.mongoURI[app.settings.env], function(err, res) {
	if(err) {
		console.log('Error connecting to the database. ' + err);
	} else {
		console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
	}
});

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var port = 8002;

var router = express.Router();

// Start Employee Interface which passes data to frontend
var employeesRoute = router.route('/employees');

employeesRoute.get(function(req, res) {
  Employee.find(function(err, employees) {
    if (err)
      res.send(err);

    res.json(employees);
  });
});

var employeeRoute = router.route('/employees/:employee_id');

employeeRoute.get(function(req, res) {
  Employee.findById(req.params.employee_id, function(err, employee) {
    if (err)
      res.send(err);

    res.json(employee);
  });
});
// End Employee Interface

// Start Timesheet Interface
var timesheetRoute = router.route('/timesheets');

timesheetRoute.get(function(req, res) {
	Timesheet.find(function(err, timesheets) {
		if (err) {
			res.send(err);
		}
		res.json(timesheets);
	});
});

// End Timesheet Interface
app.use('/', employeeRouter);
app.use('/', timesheetRouter);
app.use('/api', router);

var gracefulExit = function() {
	mongoose.connection.close(function () {
		console.log('Mongoose default connection with DB is disconnected through app termination');
		process.exit(0);
	});
};

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

var server = http.createServer(app);
server.listen(port, function() {
	console.log("Node server running on http://localhost:" + port);
});

module.exports = app;
