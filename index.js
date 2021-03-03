const mysql = require('mysql');
const inquirer = require('inquirer');
const Table = require('cli-table');

let departmentList = [];
let roleList = [];

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'myrootPassword2',
  database: 'employees_db',
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  queryTable();
})

const queryTable = () => {
  console.clear();
  let query = `SELECT employee_id, first_name, last_name, role_title, salary, department_name FROM employee_table AS tOne
  LEFT JOIN role_table AS tTwo
  ON tOne.role_id = tTwo.role_id
  LEFT JOIN department_table AS tThree
  ON tTwo.department_id = tThree.id`;

  let table = new Table({ 
    style: {'padding-left':2, 'padding-right':2},
    head:['ID', 'First Name','Last Name', 'Role Title', 'Salary', 'Department'], 
    border:[]
  });

  connection.query(query, (err, res) => {
    if (err) throw err;

    res.forEach(e => {
      table.push([e.employee_id, e.first_name, e.last_name, e.role_title, e.salary, e.department_name]);
      if (departmentList.indexOf(e.department_name) === -1) departmentList.push(e.department_name);
      if (roleList.indexOf(e.role_title) === -1) roleList.push(e.role_title);
    });

    console.log(table.toString());
    promptUser();
  });
}
const filterTable = (filterBy, keyword) => {
    console.clear();
    let table = new Table({ 
      style: {'padding-left':2, 'padding-right':2},
      head:['ID', 'First Name','Last Name', 'Role Title', 'Salary', 'Department'], 
      border:[]
    });

    connection.query(`SELECT employee_id, first_name, last_name, role_title, salary, department_name FROM employee_table AS tOne
    LEFT JOIN role_table AS tTwo
    ON tOne.role_id = tTwo.role_id
    LEFT JOIN department_table AS tThree
    ON tTwo.department_id = tThree.id
    WHERE ?? = ?`, [filterBy, keyword], (err, res) => {
    if (err) throw err;

    res.forEach(e => {
      table.push([e.employee_id, e.first_name, e.last_name, e.role_title, e.salary, e.department_name]);
    });

    console.log(table.toString());
    promptUser();
  });
}

const promptUser = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'View All Employees By Department',
        'View All Employees By Role',
        'Add Employee',
        'Remove Employee',
        'Update Employee Role',
      ],
    },
  ]).then(ans => {
    // console.log(JSON.stringify(ans, null, ' '));
    switch (ans.choice) {
      case 'View All Employees':
        queryTable();
        break;

      case 'View All Employees By Department':
        promptDepartment();
        break;

      case 'View All Employees By Role':
        promptEmployeeRole();
        break;

      case 'Add Employee':
        promptAddEmployee();
        break;

      case 'Remove Employee':

        break;

      case 'Update Employee Role':

        break;

      default:
        break;
    }
  });  
}

const promptDepartment = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: departmentList,
    },
  ]).then(ans => {
    // console.log(JSON.stringify(ans, null, ' '));
    filterTable('department_name', ans.choice)
  });  
}

const promptEmployeeRole = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: roleList,
    },
  ]).then(ans => {
    // console.log(JSON.stringify(ans, null, ' '));
    filterTable('role_title', ans.choice)
  });  
}

const promptAddEmployee = () => {
  inquirer.prompt([
    {
      
    },
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: roleList,
    },
  ]).then(ans => {
    // console.log(JSON.stringify(ans, null, ' '));
    filterTable('role_title', ans.choice)
  });  
}


