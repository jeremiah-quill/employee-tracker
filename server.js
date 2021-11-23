// const { showMenu } = require("./index.js");
// const mysql = require("mysql2");
// const cTable = require("console.table");
// // var inquirer = require("inquirer");
// const {
//   viewAllDepartments,
//   viewAllRoles,
//   viewAllEmployees,
// } = require("../server.js");
// // test();

// showMenu();

// // Connect to database
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "employees_db",
// });

// // Query to view all departments
// const viewAllDepartments = () => {
//   const sql = `SELECT department.id, department_name AS department FROM department;`;
//   db.promise()
//     .query(sql)
//     .then(([results]) => {
//       console.log("\n");
//       console.table(results);
//     })
//     .catch((err) => console.log(err))
//     .then(() => {
//       showMenu();
//     });
// };

// // Query to view all roles
// const viewAllRoles = () => {
//   const sql = `SELECT
//     role.id, role.title, department.department_name AS department, role.salary
//     FROM role
//     JOIN department ON role.department_id = department.id;`;

//   db.query(sql, (err, results) => {
//     if (err) {
//       console.log(err);

//       return;
//     }
//     console.log("\n");
//     console.table(results);
//     // showMenu();
//   });
// };

// // Query to view all employees
// const viewAllEmployees = () => {
//   const sql = `
//     SELECT
//       e.id, e.first_name, e.last_name, r.title, d.department_name AS department, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager
//     FROM employee e
//     LEFT JOIN role r ON e.role_id = r.id
//     LEFT JOIN department d ON r.department_id = d.id
//     LEFT JOIN employee m ON m.id = e.manager_id;`;

//   db.query(sql, (err, results) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log("\n");
//     console.table(results);
//     showMenu();
//   });
// };
