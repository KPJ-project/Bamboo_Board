var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.set('port',3000);

app.get('/', function(req, res){
    res.send('root');
});

app.use('/user', require('./routes/user'));

//app.use('/swagger-ui', express.static(path.join(__dirname, './node_modules/swagger-ui/dist')));

app.listen(app.get('port'), function() {
    console.log('Express Server listening on port ' + app.get('port'));
});