/**
 * Created by Lexie Infantino on 5/1/2016.
 */

var app = require("../server.js")
var employee = require("employee.js")


app.post('/createEmployee', function(request, response){
    console.log(request.body.user.name);
    console.log(request.body.user.email);
});

