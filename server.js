//Lets require/import the HTTP module
var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Models
var Employee = require('./employees/employeeSchema');
var Payroll = require('./payroll/payroll');

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

var port = 3000;

var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'HR API Module' });
});
// Start Employee Interface
var employeesRoute = router.route('/employees');

employeesRoute.post(function(req, res){

	var employee = new Employee();

	employee.firstName = req.body.firstName;
	employee.lastName = req.body.lastName;
	employee.position = req.body.position;
	employee.department = req.body.department;
	employee.street = req.body.street;
	employee.city = req.body.city;
	employee.state = req.body.state;
	employee.zipcode = req.body.zipcode;
	employee.gender = req.body.gender;
	employee.dob = req.body.dob;
	employee.phone = req.body.phoneNumber;
	employee.salary = req.body.salary;
	employee.lastModified = req.body.lastModified;

	employee.save(function(err) {
    	if (err)
    		res.send(err);
    	res.json({ message: 'Employee added!', data: employee });
    });
});

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

// Start Payroll Interface
//mongoose.createConnection('mongodb://localhost:27017/payroll');
var payrollRoute = router.route('/payroll');

payrollRoute.get(function(req, res) {
	var body = Payroll.calculatePayroll();
    res.send(body);
});

// End Payroll Interface
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