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
}// end add employee function

function deleteEmployee() {
    let currentID = $(this).data('iD');
    //get employeeID that was stored to data of delete buttom
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
}//end resetInputs function

// function addData(arrayOfIDS){
//     let counter = 0;
//     let len = arrayOfIDS.length; 
//     for (i of $('.deleteButton')) {
//         $(i).data('iD', arrayOfIDS[counter]);
//         console.log($(i).data('iD'));
//         counter++;
//     }
//} add data to each button of the employeeID after button is created

function updateTable(){
    $('#employeeList').empty();
    //clears out table to append new list
    let counter = 0;
    for ( i of employees) {
        $('#employeeList').append('<tr class="employeeData"><td>'
            + i.firstName + '</td><td>' + i.lastName + '</td><td>'
            + i.iD + '</td><td>' + i.title + '</td><td>'
            + i.annualSalary + '</td><td>' +  `<button class="deleteButton">
            Delete</button>` + '</td></tr>');
        $($('.deleteButton')[counter]).data('iD', i.iD);
        counter++;
        //assigning data of employeeID to each .deleteButton
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
    //refactor salary number to monthly expense and append to dom
    checkBudget(monthlyExpense);
    //adjust color of output if expense > budget
}//end calculateExpense

function checkBudget(monthlyExpense){
    if (monthlyExpense > budget) {
        $('#salaryOutput, #dollaSign').css('background-color', 'red'); 
    }
    else {
        $('#salaryOutput, #dollaSign').css('background-color', 'white');
    }
}//end checkBudget

