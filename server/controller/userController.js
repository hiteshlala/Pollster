var db1 = require('../db');
var db = db1.sequelize;

module.exports = { 
  get: function(req, res) {
    db.models.User.findAll({
      attributes: [ 'name', 'email', 'id']
    }).then(function(result) {
      // returns data as a stringified array of objects
      res.send(JSON.stringify(result));
    });
  }
}

