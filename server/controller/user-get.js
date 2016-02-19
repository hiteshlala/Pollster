var db = require('../db');

var userGet = function(req, res) {

  db.models.User.findAll({
    attributes: [ 'name', 'email', 'password']
  }).then(function(result) {
    // res.writeHead(200, {'Content-Type': 'application/json'}); // kills it!!
    
    // returns data as a stringified array of objects
    res.send(JSON.stringify(result));
  });

};

module.exports = userGet;