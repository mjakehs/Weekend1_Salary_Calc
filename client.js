$( document ).ready( readyNow );
class employee {
    constructor(firstName, lastName, iD, title, annualSalary,){
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
}

function addEmployee() {
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let iD = $('#employeeID').val();
    let title = $('#title').val();
    let annualSalary = $('#employeeSalary').val();
    
    let currentEmployee = new employee(firstName, lastName, 
    iD, title, annualSalary);
    employees.push(currentEmployee);
    $('#employeeList').append('<tr class="employeeData"><td>' 
    + firstName +'</td><td>' + lastName + '</td><td>'
    + iD + '</td><td>' + title + '</td><td>' 
    + annualSalary + '</td></tr>');
    let currentMonthly = annualSalary / 12;
    

}