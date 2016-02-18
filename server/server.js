var express = require('express');
var db = require('./db');

var parser = require('body-parser');

var router = require('./routes.js');

var app = express();
module.exports.app = app;

app.set('port', 8080);

app.use(parser.json());
app.use('/', router);

app.use(express.static(__dirname + '../client'));


app.listen(8080, function () {
  console.log('Example app listening on port 3000!');
});