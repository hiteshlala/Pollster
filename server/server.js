var express = require('express');
var db = require('./db');

var parser = require('body-parser');

var router = require('./routes.js');

var app = express();
module.exports.app = app;

app.set('port', 8080);

app.user(parser.json());
app.user('/', router);

app.use(express.static(__dirname + '../client'));


