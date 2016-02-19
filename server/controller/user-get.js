var db = require('../db');

var userGet = function(req, res) {

  db.models.User.findAll({
    attributes: [ 'name', 'email', 'id']
  }).then(function(result) {
    // returns data as a stringified array of objects
    res.send(JSON.stringify(result));
  });

};

module.exports = userGet;