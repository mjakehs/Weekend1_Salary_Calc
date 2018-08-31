$(document).ready(readyNow);
class employee {
    constructor(firstName, lastName, iD, title, annualSalary, ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.iD = iD;
        this.title = title;
        this.annualSalary = annualSalary;
    }
}
let employees = [];
let totalMonthly = 0;
function readyNow() {
    $('#submitButton').on('click', addEmployee);
    $('#employeeList').on('click', 'button', deleteEmployee);
}

function addEmployee() {
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let iD = $('#employeeID').val();
    let title = $('#title').val();
    let annualSalary = $('#employeeSalary').val();
    let deleteButton = '<button class="deleteButton">Delete</button>'
    let currentEmployee = new employee(firstName, lastName,
        iD, title, annualSalary);
    employees.push(currentEmployee);
    $('#employeeList').append('<tr class="employeeData"><td>'
        + firstName + '</td><td>' + lastName + '</td><td>'
        + iD + '</td><td>' + title + '</td><td class="salary">'
        + annualSalary + '</td><td>' + deleteButton + '</td></tr>');
    let currentMonthly = annualSalary / 12;
    totalMonthly += currentMonthly;
    totalMonthly = totalMonthly.toFixed(2);

    $('#salaryOutput').html(totalMonthly.toLocaleString());
    resetInputs();

    if (totalMonthly > 20000) {
        $('#salaryOutput').css('background-color', 'red');
    }
}

function deleteEmployee() {
    $(this).parents('tr').remove();
    let tempSalary = $(this).parents('td').siblings('.salary').html();
    let tempMonthly = tempSalary / 12;
    totalMonthly -= tempMonthly;
    totalMonthly = totalMonthly.toFixed(2);
    $('#salaryOutput').html(totalMonthly.toLocaleString());
    if (totalMonthly < 20000) {
        $('#salaryOutput').css('background-color', 'white');
    }
}

function resetInputs(){
    $('#firstName').val('');
    $('#lastName').val('');
    $('#employeeID').val('');
    $('#title').val('');
    $('#employeeSalary').val('');
}