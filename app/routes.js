var tim = require('./models/todo');

// expose the routes to our app with module.exports
module.exports = function(app) {

    app.get('/api/employees', function(req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function(err, res) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(res); // return all todos in JSON format
        });
    });

   
};