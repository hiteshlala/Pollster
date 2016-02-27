var express = require('express');
var db = require('./db');
var session = require('express-session');
var parser = require('body-parser');
var http = require('http');
// var angular = require('angular');
var router = require('./routes.js');

var app = express();
module.exports.app = app;

app.set('port', process.env.PORT || 8080);
app.set('view engine', 'html');

app.use(session({secret: 'latte'}));
app.use(parser.json());
// console.log("dir name", __dirname, __dirname + '/../client');
// app.use(express.static(__dirname + '/../client'));
app.use(express.static('/app/client'));
app.use(express.static('/app/lib'));
app.use('/', router);

db.sequelize.sync().then(function() {
  http.createServer(app).listen(app.get('port'), function () {
    console.log('Pollster is listening on port '+ app.get('port'));
  });
});