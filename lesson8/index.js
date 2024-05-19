const express = require('express');
const mysql = require('mysql');

//create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
})

//connecting to mysql
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySQL connected");
})

const app = express();

//create db
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql'
    db.query(sql, (err) => {
        if (err) {
            throw err;
        }
        res.send("database created");
    });
});

//create employee
app.get('/createemployee', (req, res) => {
    let sql = 'CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))'
    db.query(sql, (err) => {
        if (err) {
            throw err;
        }
        res.send('employee table created');
    });
});

//insert employee
app.get('/employee1', (req, res) => {
    let post = {name: 'jack turner', designation: 'CEO'};
    let sql = 'INSERT INTO employee SET ?';
    let query = db.query(sql, post, err => {
        if (err) {
            throw err;
        }
        res.send('employee added');
    });
});

//get employees
app.get('/getemployees', (req, res) => {
    let sql = 'SELECT * FROM employee';
    let query = db.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        console.log(results);
        res.send('employees data fetched');
    });
});

//update employee
app.get('/updateemployee/:id', (req, res) => {
    let newName = 'jack fuller';
    let sql = `UPDATE employee SET name = '${newName}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, err => {
        if (err) {
            throw err;
        }
        res.send('employee updated');
    });
});

//delete employee
app.get('/deleteemployee/:id', (req, res) => {
    let sql = `DELETE FROM employee WHERE id = ${req.params.id}`;
    db.query(sql, err => {
        if (err) {
            throw err;
        }
        res.send('employee deleted')
    })
})

app.listen('3000', () => {
    console.log('server started on port 3000')
})