const mysql = require("mysql2");
const cTable = require("console.table");
var inquirer = require("inquirer");
// const {
//   viewAllDepartments,
//   viewAllRoles,
//   viewAllEmployees,
// } = require("./helpers/queries");

const mainMenu = [
  {
    type: "list",
    name: "menu",
    message: "What would you like to do?",
    choices: [
      "View all employees",
      "Add employee",
      "Update employee role",
      "View all roles",
      "Add role",
      "View all departments",
      "Add department",
    ],
  },
];

function showMenu() {
  inquirer
    .prompt(mainMenu)
    .then((answers) => {
      switch (answers.menu) {
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add employee":
          // TODO add employee
          console.log("Add employee");
          break;
        case "Update employee role":
          // TODO update employee role
          console.log("Update employee role");
          break;
        case "View all roles":
          viewAllRoles();
          //   showMenu();
          break;
        case "Add role":
          // TODO add role
          console.log("Add role");
          break;
        case "View all departments":
          viewAllDepartments();
          //   showMenu();
          break;
        case "Add department":
          // TODO add department
          console.log("Add department");
          break;
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment");
      } else {
        console.log(error.message);
      }
    });
}

// Connect to database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employees_db",
});

// Query to view all departments
const viewAllDepartments = () => {
  const sql = `SELECT department.id, department_name AS department FROM department;`;
  db.promise()
    .query(sql)
    .then(([results]) => {
      console.log("\n");
      console.table(results);
    })
    .catch((err) => console.log(err))
    .then(() => {
      showMenu();
    });
};

// Query to view all roles
const viewAllRoles = () => {
  const sql = `SELECT 
  role.id, role.title, department.department_name AS department, role.salary
  FROM role 
  JOIN department ON role.department_id = department.id;`;

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);

      return;
    }
    console.log("\n");
    console.table(results);
    // showMenu();
  });
};

// Query to view all employees
const viewAllEmployees = () => {
  const sql = `
  SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary
  FROM employee
  JOIN role ON employee.role_id = role.id
  JOIN department ON role.department_id = department.id`;

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("\n");
    console.table(results);
    showMenu();
  });
};

showMenu();

// TODO
const addEmployee = () => {};
const updateEmployeeRole = () => {};

const addRole = () => {};
const addDepartment = () => {};

module.exports = { viewAllDepartments, viewAllRoles, viewAllEmployees };
