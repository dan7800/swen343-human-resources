//Lets require/import the HTTP module
var http = require('http');
var Employee = require('./employees/employee');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/employees');

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

var port = 3000;

var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'HR API Module' });
});

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


app.use('/api', router);
var server = http.createServer(app);
server.listen(port, function() {
    console.log("Node server running on http://localhost:" + port);
});

module.exports = app;