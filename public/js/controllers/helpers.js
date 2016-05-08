/**
 * Created by Brandon on 5/8/2016.
 */

function showEmployees(){
    var buttonTable=document.getElementById("buttonTable");
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
    var buttonTable=document.getElementById("buttonTable");
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
    var buttonTable=document.getElementById("buttonTable");
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

function showButtonTable(){
    var buttonTable=document.getElementById("buttonTable");
    var employees = document.getElementById("employees");
    var createEmployee = document.getElementById("createEmployee");
    var createTimesheet = document.getElementById("createTimesheet");
    if(buttonTable.classList.contains("hide")) {
        buttonTable.classList.remove("hide");
    }
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
}