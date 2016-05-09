angular.module('employeeController', [])

    // inject the Todo service factory into our controller
    .controller('mainController', function($scope, $http, Employees) {
        $scope.formData = {};

        // GET =====================================================================
        // when landing on the page, get all todos and show them
        // use the service to get all the todos
        Employees.get()
            .success(function(data) {
                $scope.employees = data;
            });

        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
        $scope.createEmployee = function() {

            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            // people can't just hold enter to keep adding the same to-do anymore
            if (!$.isEmptyObject($scope.formData)) {

                // call the create function from our service (returns a promise object)
                Employees.create($scope.formData)

                    // if successful creation, call our get function to get all the new todos
                    .success(function(data) {
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.employees = data; // assign our new list of todos
                    });
            }
        };

        // DELETE ==================================================================
        // delete a todo after checking it

        // Display Employee==============================================================

        $scope.fillEmployee = function(employee){
            document.getElementById("empName").innerHTML= employee.firstName + " " + employee.lastName;
            var dob=employee.dob;
            dob=dob.substring(0,10);
            document.getElementById("empDOB").innerHTML="Date of Birth: "+dob;
            document.getElementById("empPhone").innerHTML="Phone Number: "+employee.phone;
            document.getElementById("empPosition").innerHTML="Position: "+employee.position;
            document.getElementById("empDepartment").innerHTML="Department: "+employee.department;
            document.getElementById("empAddress").innerHTML="Address: "+employee.street;
            document.getElementById("empCity").innerHTML="City: "+employee.city;
            document.getElementById("empState").innerHTML="State: "+employee.state;
            document.getElementById("empZip").innerHTML="Zip Code: "+employee.zipcode;
            document.getElementById("empGender").innerHTML="Gender: "+employee.gender;
            document.getElementById("empRate").innerHTML="Hourly Rate: "+employee.hourlyRate;
            document.getElementById("currentEmpID").value=employee._id;
            document.getElementById("deletedEmployee").value=employee._id;
            var employees = document.getElementById("employees");
            var createEmployee = document.getElementById("createEmployee");
            var createTimesheet = document.getElementById("createTimesheet");
            var displayEmployee = document.getElementById("displayEmployee");
            //buttonTable.classList.add("hide");
            if(!createEmployee.classList.contains("hide"))
            {
                createEmployee.classList.add("hide");
            }
            if(!createTimesheet.classList.contains("hide"))
            {
                createTimesheet.classList.add("hide");
            }
            if(!employees.classList.contains("hide"))
            {
                employees.classList.add("hide");
            }

            if(displayEmployee.classList.contains("hide")) {
                displayEmployee.classList.remove("hide");
            }
        }
       
    });