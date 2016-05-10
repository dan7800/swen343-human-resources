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

function showTimesheets(id)
{
    var timesheetTemplate = document.getElementById("timesheet-list");
    timesheetTemplate.innerHTML="<td>Date:</td><td>Hours Worked:</td>";
    var timesheetContainer=document.getElementById("timesheetsContainer");
    var timesheets;
    $.ajax({contentType: 'application/json; charset=UTF-8', type:"GET", url:"/api/timesheets/"+id, data:id, success:function(result){
        if (result.length>0)
        {
            timesheetContainer.style.display="block";
            var i=0;
            while(i<5 && i<result.length)
            {
                timesheetTemplate.innerHTML+="<tr><td>"+result[i].dateCreated.substring(0,10)+"</td>"+"<td style='text-align:right;'>"+result[i].total+"</td></tr>";
                i++;
            }
        }
        else{
            timesheetContainer.style.display="none";
        }

    }});

}