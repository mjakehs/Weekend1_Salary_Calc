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
let employeeDataFields = 5;
//defined storage and constraint variables
function readyNow() {
    $('#submitButton').on('click', addEmployee);
    $('#employeeList').on('click', 'button', deleteEmployee);
    $('#csvInput').on('change', readFile);
    //added event to make import csv functionality run
}//added event handlers to submit button and generated delete buttons

function addEmployee() {
if (inputConditional() === true) {
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let iD = $('#employeeID').val();
    let title = $('#title').val();
    let annualSalary = $('#employeeSalary').val();
    //end variable definitions of input values
    let currentEmployee = new employee(firstName, lastName,
        iD, title, annualSalary);
    employees.push(currentEmployee);
    //end create new employee and add to employee array
    updateTable();
    //update table to reflect new list of employees
    calculateExpense();
    //calculates monthly expense and display to page
    resetInputs();
    //sets input fields to placeholder value
    }
}// end add employee function

function deleteEmployee() {
    let currentID = $(this).data('iD');
    //get employeeID that was stored to data of delete button
    for (let i = 0; i < employees.length; i++){
        if (employees[i].iD == currentID) {
            employees.splice(i, 1);
        }
    }//loop through employees to remove employee with matching ID
    updateTable();
    //update table to reflect new list of employees
    calculateExpense();
    //calculate monthly expense and display to page
}//end delete employee function

function resetInputs(){
    $('#firstName').val('');
    $('#lastName').val('');
    $('#employeeID').val('');
    $('#title').val('');
    $('#employeeSalary').val('');
    $('#csvInput').val('');
}//end resetInputs function

function inputConditional(){
    if (
    $('#firstName').val() != '' &&
    $('#lastName').val() != '' &&
    $('#employeeID').val() != '' &&
    $('#title').val() != '' &&
    $('#employeeSalary').val() != '' 
    ) {
        return true
    }//only run addEmployee if inputs have values
    else {
        return false
    }
}//end inputConditional

function updateTable(){
    $('#employeeList').empty();
    //clears out table to append new list
    let counter = 0;
    for ( i of employees) {
        $('#employeeList').append('<tr class="employeeData"><td>'
            + i.firstName + '</td><td>' + i.lastName + '</td><td>'
            + i.iD + '</td><td>' + i.title + '</td><td>'
            + i.annualSalary + '</td><td>' +  `<button class="btn btn-danger">
            Delete</button>` + '</td></tr>');
        $($('.btn-danger')[counter]).data('iD', i.iD);
        counter++;
        //assigning data of employeeID to each .deleteButton
    }//loops through employees array and adds each to the html table
}//end update table

function calculateExpense(){
    let totalSalary = 0;
    for (i of employees) {
        let salary = parseInt(i.annualSalary);
        totalSalary += salary;
    }//loop through employees to get sum of salaries
    let monthlyExpense = totalSalary / 12;
    monthlyExpense = monthlyExpense.toFixed(2);
    monthlyExpense = parseFloat(monthlyExpense);
    //setting monthly expense to two decimals, then converting back to a number
    checkBudget(monthlyExpense);
    //adjust color of output if expense > budget
    monthlyExpense = monthlyExpense.toLocaleString();
    //converting monthly expense into a formatted string with commas
    $('#salaryOutput').text(monthlyExpense);
    //refactor salary number to monthly expense and append to dom
}//end calculateExpense

function checkBudget(monthlyExpense){
    if (monthlyExpense > budget) {
        $('#salaryOutput, #dollaSign').css('color', 'red');
        $('#overBudget').css('display', 'block'); 
    }//used color instead of background color because I think
    //it looks better.
    else {
        $('#salaryOutput, #dollaSign').css('color', 'black');
        $('#overBudget').css('display', 'none');
    }//also added an alert banner that lets user know they are over budget
}//end checkBudget


