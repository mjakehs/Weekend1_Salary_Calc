$(document).ready(readyNow);
class employee {
    constructor(firstName, lastName, iD, title, annualSalary, ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.iD = iD;
        this.title = title;
        this.annualSalary = annualSalary;
    }
}//created employee class
let employees = [];
let budget = 20000;
//defined storage and constraint variables
function readyNow() {
    $('#submitButton').on('click', addEmployee);
    $('#employeeList').on('click', 'button', deleteEmployee);
}//added event handlers to submit button and generated delete buttons

function addEmployee() {
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let iD = $('#employeeID').val();
    let title = $('#title').val();
    let annualSalary = $('#employeeSalary').val();
    //end variable definitions for creating employee + appending to DOM
    let currentEmployee = new employee(firstName, lastName,
        iD, title, annualSalary);
    employees.push(currentEmployee);
    //end updating employee records
    updateTable();
    //update table to reflect new list of employees
    calculateExpense();
    //calculates monthly expense and displays to page
    resetInputs();
    //sets input fields to placeholder value
}// end add employee function

function deleteEmployee() {
    let currentID = $(this).data('iD');
    for (i of employees){
        if (i.iD == currentID) {
            employees.splice(i, 1);
        }
    }
    updateTable();
    calculateExpense();
}//end delete employee function

function resetInputs(){
    $('#firstName').val('');
    $('#lastName').val('');
    $('#employeeID').val('');
    $('#title').val('');
    $('#employeeSalary').val('');
}//end resetInputs function

function addData(id){
 $('#' + id).data('iD', id);
}// adds data to each button of the employeeID

function updateTable(){
    $('#employeeList').empty();
    //clears out table to append new list
    for ( i of employees) {
        $('#employeeList').append('<tr class="employeeData"><td>'
            + i.firstName + '</td><td>' + i.lastName + '</td><td>'
            + i.iD + '</td><td>' + i.title + '</td><td>'
            + i.annualSalary + '</td><td>' +  `<button id="` + i.iD + `"
            class="deleteButton">Delete</button>` + '</td></tr>');
            addData(i.iD);
    } 
}//end update table

function calculateExpense(){
    let totalSalary = 0;
    for (i of employees) {
        let salary = parseInt(i.annualSalary);
        totalSalary += salary;
    }//loop through employees to get sum of salaries
    let monthlyExpense = totalSalary / 12;
    monthlyExpense = monthlyExpense.toFixed(2)
    $('#salaryOutput').html(monthlyExpense);
    //refactoring salary number to monthly expense and appending to dom
    checkBudget(monthlyExpense);
    //adjusts color of output if expense > budget
}//end calculateExpense

function checkBudget(monthlyExpense){
    if (monthlyExpense > budget) {
        $('#salaryOutput, #dollaSign').css('background-color', 'red'); 
    }
    else {
        $('#salaryOutput, #dollaSign').css('background-color', 'white');
    }
}//end checkBudget

