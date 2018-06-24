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
            res.send(ResultSuccess(200, rows[0].id, rows[0].nickname));
        }
        else {
            console.log('Login Fail');
            res.send(ResultFail(204));
        }
    })
});

var ResultSuccess = function(code, pk, nickname) {
    var result = {'result' : 
                    { 'status' : code ,
                      'msg' : 'OK',
                      'data' : 
                        [{  'pk' : pk,
                           'nickname' : nickname
                        }]
                    }
                }
    
    return result;
};

var ResultFail = function(code) {
    var result = {'result' : 
                    { 'status' : code ,
                      'msg' : 'No Content',
                      'data' : []
                    }
                }
    
    return result;
};

router.post('/signup', function(req, res) {
    var insertQuery = 'insert into user (user_id, user_password, nickname, update_at, create_at)' +
                    'values (\'@user_id\', \'@user_password\', \'@nickname\', ' +
                    '\'' + new Date() + '\', \'' + new Date()  

    connection.query('', function(err, rows) {

    }) ;
});

module.exports = router;

