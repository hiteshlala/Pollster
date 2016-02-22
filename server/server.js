var express = require('express');
var db = require('./db');
var session = require('express-session');
var parser = require('body-parser');

var router = require('./routes.js');

var app = express();
module.exports.app = app;

app.set('port', 8080);

app.use(session({secret: 'latte'}));
app.use(parser.json());
app.use(express.static(__dirname + '/../client'));
app.use('/', router);


app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});