angular.module('timesheetController', [])

    // inject the Todo service factory into our controller
    .controller('mainController', function($scope, $http, Timesheets) {
        $scope.formData = {};

        // GET =====================================================================
        // when landing on the page, get all todos and show them
        // use the service to get all the todos
        Employees.get()
            .success(function(data) {
                $scope.employees = data;
            });

        
    });