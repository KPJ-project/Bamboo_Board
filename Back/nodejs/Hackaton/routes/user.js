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

router.post('/login', function(req, res) {

    var user_id = req.body.user_id;
    var user_password = req.body.user_password;

    var selectQuery = 'select id, nickname from user ' +
                    'where user_id = \'' + user_id +  '\' and user_password = \'' + user_password + '\'';

    console.log(selectQuery);
    connection.query(selectQuery, function(err, rows) {
        if(err) throw err;

        console.log(rows);
        if(rows.length) {
            console.log('Login Success');
            res.send(ResultSuccess(200, 'OK', rows[0].id, rows[0].nickname));
        }
        else {
            console.log('Login Fail');
            res.send(ResultFail(204, 'No Content'));
        }
    })
});

var ResultSuccess = function(code, msg, pk, nickname) {
    var result = {'result' : 
                    { 'status' : code ,
                      'msg' : msg,
                      'data' : 
                        [{  'pk' : pk,
                           'nickname' : nickname
                        }]
                    }
                }
    
    return result;
};

var ResultFail = function(code, msg) {
    var result = {'result' : 
                    { 'status' : code ,
                      'msg' : msg,
                      'data' : []
                    }
                }
    
    return result;
};

router.post('/signup', function(req, res) {
    var insertQuery = 'insert into user (user_id, user_password, nickname, update_at, create_at) ' +
                    'values (?, ?, ?, ?, ?)';
    var params = [req.body.user_id, req.body.user_password, req.body.nickname, new Date(), new Date()];

    connection.query(insertQuery, params ,function(err, rows, fields) {
        if(err) {
            res.send(ResultFail(500, 'Internal Server Error'))
        }

        console.log(rows.affectedRows);

        if(rows.affectedRows > 0) {
            res.send(ResultSuccess(201, 'Created', rows.insertId, req.body.nickname));
        }
        else if(rows.affectedRows == 0) {
            res.send(ResultSuccess(500, 'Internal Server Error'));
        }
    });
});

module.exports = router;

