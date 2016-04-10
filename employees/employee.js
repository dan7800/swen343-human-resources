var mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	position: String,
	department: String,
	street: String,
	city: String,
	state: String,
	zipcode: Number,
	gender: String,
	dob: Date,
	phone: String,
	salary: Number,
    lastModified: Date
});

module.exports = mongoose.model('Employee', employeeSchema);

