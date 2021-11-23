INSERT INTO department (department_name)
VALUES ("Accounting"),
       ("Legal"),
       ("Sales"),
       ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("CPA", 75000, 1),
       ("Legal Team Lead", 100000, 2),
       ("Lawyer", 80000, 2),
       ("Lead Engineer", 100000, 4),
       ("Software Engineer", 85000, 4),
       ("Sales Lead", 75000, 3),
       ("Salesperson", 50000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jeremiah", "Quill", 4, NULL),
       ("Meghan", "Quill", 5, 1),
       ("Remi", "Quill", 2, NULL);

