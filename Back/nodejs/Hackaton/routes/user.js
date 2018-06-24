const router = require('express').Router();
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig);

connection.connect();

router.get('/users', function(req, res) {

    connection.query('select * from user', function(err, rows) {
        if(err) throw err;

        console.log('The solution is : ', rows);
        res.send(rows);
    });
});

module.exports = router;

