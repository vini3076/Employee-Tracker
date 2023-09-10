require("dotenv").config();
const express = require('express');
const inquirer = require('inquirer');
require("console.table")
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },


  console.log(`Connected to the employee_db database.`)
);

db.connect(err => {
    if (err) {
        console.error(err);
    }
});

function init() {
    inquirer.prompt   ([ {
        type: 'list',
        name: 'mainMenu',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Exit']
    }]).then ((answers) =>{

        switch(answers.mainMenu){
            case'View All Employees':
            viewAllEmployees();
            break;

            case 'Add Employee':
            addEmployee()
            break;

           case "View All Departments":
           viewAllDepartments();        
           break;

           case "Add Department":
           addDepartment();        
           break;


           case "View All Roles":
           viewAllRoles();        
           break;

           case "Add Role":
           addRole();        
           break;

        }
    })
    
    
}

init();

function viewAllEmployees (){
    db.promise().query('SELECT * FROM employee').then(([results]) => {
        console.table(results);
        setTimeout(init, 500)
      })
}

const addEmployee = async () => {

     const [roles] = await db.promise().query('SELECT * FROM roles')
     const roleChoices = roles.map(role => ({name: role.title, value: role.id}));
 
     const [employees] = await db.promise().query('SELECT * FROM employee')
    const managerChoices = employees.map(employee => ({name: `${employee.first_name} ${employee.last_name}`, value: employee.id}));
    managerChoices.push({name:'None', value: null});
     
     const employee = await inquirer.prompt([
      {
          type: 'input',
          name: 'first_name',
          message: 'What is the first name of this employee?'
      },
      {
         type: 'input',
         name: 'last_name',
         message: 'What is the last name of this employee?'
     },
     {
         type: 'list',
         name: 'role_id',
         message: "What is this employee's role?",
         choices: roleChoices
     },
     {
        
         type: 'list',
         name: 'manager_id',
         message: "Who is this employee's manager?",
         choices: managerChoices
     }
  
      ])
      await db.promise().query('insert into employee set ?', employee)
 
      console.log('employee added to database');
      setTimeout(init, 500)
  };

function viewAllDepartments (){
    db.promise().query('SELECT * FROM department').then(([results]) => {
        console.table(results);
        setTimeout(init, 500);
      })
}

const addDepartment = async () => {
    const department = await inquirer.prompt([
     {
         type: 'input',
         name: 'name',
         message: 'Name of the new Department?'
     }
 
     ])
         await db.promise().query('insert into department set ?', department)
 
         console.log('department added to database');
         setTimeout(init, 500)
 }

function viewAllRoles (){

    db.promise().query('select roles.id, roles.title, roles.salary, department.name as department from roles left join department on roles.department_id = department.id').then(([results]) => {
   console.table(results);
   setTimeout(init, 500)
});
}

const addRole = async () => {
    const [departments] = await db.promise().query('SELECT * FROM department')
     const departmentChoices = departments.map(department => ({name: department.name, value: department.id}));
 
    const role = await inquirer.prompt([
     {
         type: 'input',
         name: 'title',
         message: 'Title of the new Role?'
     },
     {
        type: "number",
        name: "salary",
        message: "What is the salary for this new role? (enter number, no commas)"
    },
     {
        
        type: 'list',
        name: 'department_id',
        message: "Which department this role is in?",
        choices: departmentChoices
    }
 
     ])
         await db.promise().query('insert into roles set ?', role)
 
         console.log('role added to database');
         setTimeout(init, 500)
 }
   