const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'employees_db',
})

inquirer.prompt([
  {
    type: 'list',
    name: 'editchoice',
    message: 'What would you like to do?',
    choices: [
      'View All Employees',
      'View All Employees By Department',
      'View All Employees By Manager',
      'Add Employee',
      'Remove Employee',
      'Update Employee Role',
      'Update Empoyee Manager',
    ],
  },
]).then(ans => {
  console.log(JSON.stringify(ans, null, ' '));
});




connection.query('SELECT * FROM employee_table', (err, res) => {
    if (err) throw err;
    console.log(res);
  }

)

connection.connect((err) => {
  if (err) {
    console.error(`error connecting to database: ${err.stack}`);
    return;
  }
  console.log(`connected as id ${connection.threadID}`);
  connection.end();
});