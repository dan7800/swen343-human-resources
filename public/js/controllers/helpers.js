/**
 * Created by Brandon on 5/8/2016.
 */

function showEmployees(){
    var employees = document.getElementById("employees");
    var createEmployee = document.getElementById("createEmployee");
    var createTimesheet = document.getElementById("createTimesheet");
    var displayEmployee = document.getElementById("displayEmployee");
    //buttonTable.classList.add("hide");
    if(employees.classList.contains("hide")) {
        employees.classList.remove("hide");
    }
    if(!createEmployee.classList.contains("hide"))
    {
        createEmployee.classList.add("hide");
    }
    if(!createTimesheet.classList.contains("hide"))
    {
        createTimesheet.classList.add("hide");
    }
    if(!displayEmployee.classList.contains("hide"))
    {
        displayEmployee.classList.add("hide");
    }
}

function showCreateEmployee(){
    var employees = document.getElementById("employees");
    var createEmployee = document.getElementById("createEmployee");
    var createTimesheet = document.getElementById("createTimesheet");
    var displayEmployee = document.getElementById("displayEmployee");
    //buttonTable.classList.add("hide");
    if(createEmployee.classList.contains("hide")) {
        createEmployee.classList.remove("hide");
    }
    if(!employees.classList.contains("hide"))
    {
        employees.classList.add("hide");
    }
    if(!createTimesheet.classList.contains("hide"))
    {
        createTimesheet.classList.add("hide");
    }
    if(!displayEmployee.classList.contains("hide"))
    {
        displayEmployee.classList.add("hide");
    }
}

function showCreateTimesheet(){
    var employees = document.getElementById("employees");
    var createEmployee = document.getElementById("createEmployee");
    var createTimesheet = document.getElementById("createTimesheet");
    var displayEmployee = document.getElementById("displayEmployee");
    //buttonTable.classList.add("hide");
    if(createTimesheet.classList.contains("hide")) {
        createTimesheet.classList.remove("hide");
    }
    if(!createEmployee.classList.contains("hide"))
    {
        createEmployee.classList.add("hide");
    }
    if(!employees.classList.contains("hide"))
    {
        employees.classList.add("hide");
    }
    if(!displayEmployee.classList.contains("hide"))
    {
        displayEmployee.classList.add("hide");
    }
}

function deleteEmployee()
{
    var employee=document.getElementById("empName").innerHTML;
    var id=document.getElementById("currentEmpID").value;
    if(confirm('You are about to delete "'+ employee+'"!  Would you like to continue?'))
    {
        document.forms["deleteEmployee"].submit();
    }
}