const mysql = require("mysql2");
const cTable = require("console.table");
var inquirer = require("inquirer");

const showMenu = () => {
  inquirer
    .prompt([
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
    ])
    .then((answers) => {
      switch (answers.menu) {
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "Update employee role":
          updateEmployeeRole();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "Add role":
          addRole();
          break;
        case "View all departments":
          viewAllDepartments();
          break;
        case "Add department":
          addDepartment();
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
};

// Connect to database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employees_db",
});

// Query to view all departments
const viewAllDepartments = () => {
  const sql = `SELECT d.id, department_name AS department FROM department d;`;
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

// Query to view all roles
const viewAllRoles = () => {
  const sql = `SELECT 
  r.id, r.title, d.department_name AS department, r.salary
  FROM role r 
  JOIN department d ON r.department_id = d.id;`;
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

// Query to view all employees
const viewAllEmployees = () => {
  const sql = `
  SELECT
    e.id, e.first_name, e.last_name, r.title, d.department_name AS department, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager
  FROM employee e
  LEFT JOIN role r ON e.role_id = r.id
  LEFT JOIN department d ON r.department_id = d.id
  LEFT JOIN employee m ON m.id = e.manager_id;`;
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
const updateEmployeeRole = () => {
  const sql = `SELECT e.id, CONCAT(e.first_name, " ", e.last_name) AS employee FROM employee e;`;
  db.promise()
    .query(sql)
    .then(([results]) => {
      let employees = results.map((result) => {
        return {
          name: result.employee,
          value: { id: result.id, name: result.employee },
        };
      });

      const sql2 = `SELECT r.id, r.title FROM role r;`;
      db.promise()
        .query(sql2)
        .then(([results]) => {
          let roles = results.map((result) => {
            return {
              name: result.title,
              value: { id: result.id, name: result.title },
            };
          });
          inquirer
            .prompt([
              {
                type: "list",
                name: "updatedEmployee",
                message: "Which employee's role do you want to update?",
                choices: employees,
              },
              {
                type: "list",
                name: "updatedRole",
                message:
                  "Which role do you want to assign the selected employee?",
                choices: roles,
              },
            ])
            .then((answers) => {
              const { updatedEmployee, updatedRole } = answers;
              const sql = `UPDATE employee
              SET role_id = ?
              WHERE id = ?`;
              db.query(
                sql,
                [updatedRole.id, updatedEmployee.id],
                (err, results) => {
                  if (err) {
                    console.log(err);
                    return;
                  }
                  console.log("\n");
                  console.log(
                    `Updated ${updatedEmployee.name} to be a ${updatedRole.name} in the database`
                  );
                  showMenu();
                }
              );
            })
            .catch((error) => {
              if (error.isTtyError) {
                console.log(
                  "Prompt couldn't be rendered in the current environment"
                );
              } else {
                console.log(error.message);
              }
            });
        });
    });
};

// UPDATE employee
// SET role_id = ?
// WHERE id = ?

// Prompts user for new role properties and adds the new role to db
const addRole = () => {
  const sql = `SELECT d.id, d.department_name AS department FROM department d;`;
  db.promise()
    .query(sql)
    .then(([results]) => {
      let departments = results.map((result) => {
        return {
          name: result.department,
          value: { id: result.id, name: result.department },
        };
      });
      inquirer
        .prompt([
          {
            type: "input",
            name: "newRoleName",
            message: "What is the name of the role?",
          },
          {
            type: "input",
            name: "newRoleSalary",
            message: "What is the salary of the role?",
          },
          {
            type: "list",
            name: "newRoleDepartment",
            message: "Which department does the role belong to?",
            choices: departments,
          },
        ])
        .then((answers) => {
          const { newRoleName, newRoleSalary, newRoleDepartment } = answers;
          const sql = `INSERT INTO role SET ?`;
          db.query(
            sql,
            {
              title: newRoleName,
              salary: newRoleSalary,
              department_id: newRoleDepartment.id,
            },
            (err, results) => {
              if (err) {
                console.log(err);
                return;
              }
              console.log("\n");
              console.log(`Added ${newRoleName} to the database`);
              showMenu();
            }
          );
        })
        .catch((error) => {
          if (error.isTtyError) {
            console.log(
              "Prompt couldn't be rendered in the current environment"
            );
          } else {
            console.log(error.message);
          }
        });
    });
};

// Prompts user for new role properties and adds the new role to db
const addEmployee = () => {
  const sql = `SELECT r.id, r.title FROM role r;`;
  db.promise()
    .query(sql)
    .then(([results]) => {
      let roles = results.map((result) => {
        return {
          name: result.title,
          value: { id: result.id, name: result.title },
        };
      });

      const sql2 = `SELECT e.id, CONCAT(e.first_name, " ", e.last_name) AS manager FROM employee e;`;
      db.promise()
        .query(sql2)
        .then(([results]) => {
          let employees = results.map((result) => {
            return {
              name: result.manager,
              value: { id: result.id, name: result.manager },
            };
          });
          inquirer
            .prompt([
              {
                type: "input",
                name: "newEmployeeFirstName",
                message: "What is the employees first name?",
              },
              {
                type: "input",
                name: "newEmployeeLastName",
                message: "What is the employees last name?",
              },
              {
                type: "list",
                name: "newEmployeeRole",
                message: "What is the employee's role?",
                choices: roles,
              },
              {
                type: "list",
                name: "newEmployeeManager",
                message: "Who is the employee's manager?",
                choices: [
                  ...employees,
                  {
                    name: "Employee does not have a manager",
                    value: {
                      id: null,
                      name: "Employee does not have a manager",
                    },
                  },
                ],
              },
            ])
            .then((answers) => {
              const {
                newEmployeeFirstName,
                newEmployeeLastName,
                newEmployeeRole,
                newEmployeeManager,
              } = answers;
              const sql = `INSERT INTO employee SET ?`;
              db.query(
                sql,
                {
                  first_name: newEmployeeFirstName,
                  last_name: newEmployeeLastName,
                  role_id: newEmployeeRole.id,
                  manager_id: newEmployeeManager.id,
                },
                (err, results) => {
                  if (err) {
                    console.log(err);
                    return;
                  }
                  console.log("\n");
                  console.log(
                    `Added ${newEmployeeFirstName} ${newEmployeeLastName} to the database`
                  );
                  showMenu();
                }
              );
            })
            .catch((error) => {
              if (error.isTtyError) {
                console.log(
                  "Prompt couldn't be rendered in the current environment"
                );
              } else {
                console.log(error.message);
              }
            });
        });
    });
};

// Prompts user for new department name and adds new department to db
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDepartment",
        message: "What is the name of the department?",
      },
    ])
    .then((answers) => {
      const { newDepartment } = answers;
      const sql = `INSERT INTO department SET department_name = ?`;
      db.query(sql, newDepartment, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("\n");
        console.log(`Added ${newDepartment} to the database`);
        showMenu();
      });
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment");
      } else {
        console.log(error.message);
      }
    });
};
