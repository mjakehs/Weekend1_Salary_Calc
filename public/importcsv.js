//this js file holds functions necessary for the import csv function to work.
//they have been separated from the client.js file since they are not part of the challenge

function readFile(event) {
    let input = event.target;
    let reader = new FileReader();
    //creating file reader to parse csv file
    reader.onload = function () {
        let readText = reader.result;
        toArray(readText);
        //send reader results to the toArray function
    }//declare function to execute when reader is finished running
    reader.readAsText(input.files[0]);
    //executing the fileReader on the csv input file
};

function toArray(string){
    let newArray = [];
    let j = -1;
    //declared container and counter variables
    for (let i = 0; i <= string.length; i++ ){
        let stringItem = string.charAt(i);
        if (stringItem == ',' || stringItem == '\n'
            || i == string.length){
            newArray.push(string.slice(j + 1, i));
            j = i;
        }//loop through string characters to slice out employee
        //data and push it into the array
    }
   refactorArray(newArray);
   //passing new array of employee data to refactoring function
}//end toArray function

function refactorArray(anArray){
    let newArray = [];
    let j = employeeDataFields - 1;
    //declared container and counter variables
    for (let i = 0; i < anArray.length; i += employeeDataFields) {
        newArray.push(anArray.slice(i, j + 1));
        j += employeeDataFields;
    }//loop through the parameter array, splice off sets of data
    //belonging to each unique employee, push each new array into
    //an array of arrays of employee data 
    csvToEmployeeObjects(newArray);
}//end refactorArray function

function csvToEmployeeObjects(empArr){
    for (let i = 0; i < empArr.length; i++){
        employees.push(new employee(empArr[i][0],empArr[i][1],empArr[i][2],
            empArr[i][3], empArr[i][4]));
    }//loop through array of employees from csv and create
    //employee objects
    updateTable();
    calculateExpense();
    resetInputs();
}// end csvToEmployeeObjects function 