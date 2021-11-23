// const mysql = require("mysql2");
// const cTable = require("console.table");
// var inquirer = require("inquirer");
// const {
//   viewAllDepartments,
//   viewAllRoles,
//   viewAllEmployees,
// } = require("../server.js");

// const mainMenu = [
//   {
//     type: "list",
//     name: "menu",
//     message: "What would you like to do?",
//     choices: [
//       "View all employees",
//       "Add employee",
//       "Update employee role",
//       "View all roles",
//       "Add role",
//       "View all departments",
//       "Add department",
//     ],
//   },
// ];

// function showMenu() {
//   inquirer
//     .prompt(mainMenu)
//     .then((answers) => {
//       switch (answers.menu) {
//         case "View all employees":
//           viewAllEmployees();
//           break;
//         case "Add employee":
//           // TODO add employee
//           console.log("Add employee");
//           break;
//         case "Update employee role":
//           // TODO update employee role
//           console.log("Update employee role");
//           break;
//         case "View all roles":
//           viewAllRoles();
//           //   showMenu();
//           break;
//         case "Add role":
//           // TODO add role
//           console.log("Add role");
//           break;
//         case "View all departments":
//           viewAllDepartments();
//           //   showMenu();
//           break;
//         case "Add department":
//           // TODO add department
//           console.log("Add department");
//           break;
//       }
//     })
//     .catch((error) => {
//       if (error.isTtyError) {
//         console.log("Prompt couldn't be rendered in the current environment");
//       } else {
//         console.log(error.message);
//       }
//     });
// }

// showMenu();

// // TODO
// const addEmployee = () => {};
// const updateEmployeeRole = () => {};

// const addRole = () => {};
// const addDepartment = () => {};

// module.exports = { viewAllDepartments, viewAllRoles, viewAllEmployees };
