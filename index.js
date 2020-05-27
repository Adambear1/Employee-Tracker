const inquirer = require('inquirer')
const sql = require('mysql');
// const util = require('util');

const connection = sql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "gemini253",
    database: "homeworkdb"
});

connection.connect(err => {
    if (err) err;
    runSearch()
});

function runSearch() {
    inquirer.prompt({
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: [
            'Add', 'View', 'Update'
        ]
    }).then(answer => {
        switch (answer.action) {
            case "Add":
                add();
                break;
            case "View":
                view();
                break;
            case "Update":
                update();
                break;
        }
    })
}
//ADD
function add() {
    inquirer.prompt({
        name: 'add',
        type: 'list',
        message: 'What would you like to add to?',
        choices: ['Department', 'Employee', 'Roles']
    }).then(answer => {
        switch (answer.add) {
            case "Department":
                addDepartment();
                break
            case "Employee":
                addEmployee();
                break;
            case 'Roles':
                addRole()
                break;

        }
    })
}
function addDepartment() {
    inquirer.prompt({
        name: 'departmentNAME',
        type: 'input',
        message: 'Please enter the department name you would like to add:'
    })
        .then(answer => {
            var insert_department_query = "INSERT INTO department SET ?"
            connection.query(insert_department_query, { name: answer.departmentNAME }, (err, res) => {
                if (err) throw err;
            })
            runSearch()
        })

}

function addEmployee() {
    inquirer.prompt([
        {
            name: 'firstname',
            type: 'input',
            message: 'What is the employees first name?'

        },
        {
            name: 'lastname',
            type: 'input',
            message: 'What is the employees last name?'
        },
        {
            name: 'roleID',
            type: 'number',
            message: 'What is the employees idenfication number?'
        },
        {
            name: 'managerID',
            type: 'number',
            message: 'What is the manangers identification number?'
        }]
    ).then(answer => {
        var insert_employee_query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)"
        connection.query(insert_employee_query, [answer.firstname, answer.lastname, answer.roleID, answer.managerID]
            , (err) => {
                if (err) throw err;
            })
        runSearch()
    })
}

function addRole() {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What is the title of the employee?'

        },
        {
            name: 'salary',
            type: 'number',
            message: 'What is the employees starting salary?'
        },
        {
            name: 'departmentID',
            type: 'number',
            message: 'What is the department identification number?'
        }]).then(answer => {
            var insert_role_query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)"
            connection.query(insert_role_query, [answer.title, answer.salary, answer.departmentID], (err, res) => {
                if (err) throw err;
            })
            runSearch()
        })
}
//VIEW
function view() {
    inquirer.prompt({
        name: 'view',
        type: 'list',
        message: 'What would you like to view?',
        choices: ['Department', 'Employee', 'Roles']
    }).then(answer => {
        switch (answer.view) {
            case "Department":
                viewDepartment();
                break;
            case "Employee":
                viewEmployee();
                break;
            case 'Roles':
                viewRole()
                break;

        }
    })
}
function viewDepartment() {
    connection.query("SELECT * FROM department ORDER BY id", (err, result) => {
        if (err) throw err;
        console.table(result)
    })
    runSearch()
}
function viewEmployee() {
    connection.query("SELECT * FROM employee ORDER BY id", (err, result) => {
        if (err) throw err;
        console.table(result)
    })
    runSearch()
}
function viewRole() {
    connection.query("SELECT * FROM role ORDER BY id", (err, result) => {
        if (err) throw err;
        console.table(result)
    })
    runSearch()
}
//UPDATE
function update() {
    inquirer.prompt([{
        name: 'update',
        type: 'list',
        message: 'What would you like to update?',
        choices: ['Department', 'Employee', 'Roles']
    }]).then(answer => {
        switch (answer.update) {
            case "Department":
                updateDepartment();
                break;
            case "Employee":
                updateEmployee();
                break;
            case 'Roles':
                updateRole()
                break;
        }
    })
}

function updateDepartment() {
    connection.query("SELECT * FROM department", (err, response) => {
        console.table(response)
    }).then(
        inquirer.prompt([
            {
                name: 'departmentID',
                type: 'input',
                message: 'Which department id value would you like to update?'
            },
            {
                name: 'newValue',
                type: 'input',
                message: 'What new value would you like to insert instead?'
            }
        ])).then(answer => {
            var update_department_query = "UPDATE department SET name = ? WHERE id = ?";
            connection.query(update_department_query, [answer.newValue], [+answer.departmentID], (err, res) => {
                if (err) throw err;
            })
            runSearch()
        })
}

            // )).then(answer => {
            //     var update_department_query = "UPDATE department SET department = ? WHERE department = ?";
            //     connection.query(update_department_query, [answer.])
            // })

