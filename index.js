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

// const cq = util.promisify(connection.query)

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
            // inquirer.prompt({
            //     name: 'departmentNAME',
            //     type: 'input',
            //     message: 'Please enter the department name you would like to add:'
            // })
            //     .then(answer => {
            //         var query = "INSERT INTO department SET ?"
            //         connection.query(query, { name: answer.departmentNAME }, (err, res) => {
            //             if (err) err;
            //             console.table(res.data)
            //         })
            //     })
            // runSearch()
            case "Employee":
                addEmployee();
                break;
            // inquirer.prompt(
            //     {
            //         name: 'firstname',
            //         type: 'input',
            //         message: 'What is the employees first name?'

            //     },
            //     {
            //         name: 'lastname',
            //         type: 'input',
            //         message: 'What is the employees last name?'
            //     },
            //     {
            //         name: 'roleID',
            //         type: 'number',
            //         message: 'What is the employees idenfication number?'
            //     },
            //     {
            //         name: 'managerID',
            //         type: 'number',
            //         message: 'What is the manangers identification number?'
            //     }
            // ).then(answer => {
            //     var query = "INSERT INTO employee SET ?"
            //     return cq(query, {
            //         first_name: answer.firstname,
            //         last_name: answer.lastname,
            //         role_id: roleID,
            //         manager_id: managerID
            //     }, (err, res) => {
            //         if (err) err;
            //         console.table(res.data)
            //     })
            // })
            // runSearch()
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
            var department_query = "INSERT INTO department SET ?"
            connection.query(department_query, { name: answer.departmentNAME }, (err, res) => {
                if (err) err;
                console.table(res.data)
            })
            // runSearch()
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
        var employee_query = "INSERT INTO employee SET (?, ?, ?, ?)"
        connection.query((employee_query, { first_name: answer.firstname, last_name: answer.lastname, role_id: answer.roleID, manager_id: answer.managerID }
            , (err) => {
                if (err) throw err;
            }))
    })

}

function addRole() {
    console.log('hi')
}




function view() {
    var query = "POST ? FROM "
}