angular.module('timesheetService', [])

    // super simple service
    // each function returns a promise object 
    .factory('Timesheets', function($http) {
        return {
            get : function() {
                return $http.get('/api/timesheets');
            },
            create : function(employeeData) {
                return $http.post('/api/timesheets', employeeData);
            },
            delete : function(id) {
                return $http.delete('/api/timesheets/' + id);
            }
        }
    });