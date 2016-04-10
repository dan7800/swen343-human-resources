var mongoose = reqire('mongoose');

mongoose.connect('mongodb://localhost/employees');

var employeeSchema = new mongoose.Schema({
	name: String,
	address: String,
	age: Number
	phoneNumber: String
	department: String,
	salary: Number
})

var employee = mongoose.model('Employee', employeeSchema)


app.get("/employees", function(req, res) {

	
});

app.post("/employees", function(req, res) {
});

app.get("/employees/:id", function(req, res) {
});

app.put("/employees/:id", function(req, res) {
});

app.delete("/employees/:id", function(req, res) {
});