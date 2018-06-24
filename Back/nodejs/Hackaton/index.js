var express = require('express');
//var mysql = require('mysql');
var bodyParser = require('body-parser');
//var dbconfig = require('./config/database.js');
// var connection = mysql.createConnection({
//     host : '172.30.1.42',
//     user : 'root',
//     password : 'st1021759!',
//     port : 3306,
//     database : 'bamboo'
// });

//connection.connect();

var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.set('port',3000);

app.get('/', function(req, res){
    res.send('root');
});

app.use('/user', require('./routes/user'));

// app.get('/users', function(req, res) {

//     connection.query('select * from user', function(err, rows) {
//         if(err) throw err;

//         console.log('The solution is : ', rows);
//         res.send(rows);
//     });
// });

app.listen(app.get('port'), function() {
    console.log('Express Server listening on port ' + app.get('port'));
});