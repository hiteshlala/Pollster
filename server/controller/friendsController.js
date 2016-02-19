var db = require('../db');

module.exports = {
  friends: {
    post: function(req, res) {
      console.log(req.body)
      var user1 = req.body.UserId;
      var user2 = req.body.FriendId;
      db.models.Relationships.create({
        UserId: user1,
        FriendId: user2
      }).then(function(data) {
        res.send(201,data);
      });
    },
    get: function(req, res) {
      console.log(req.query)
      db.models.Relationships.findAll({
        where: {
          $or: [
            {FriendId: req.query.UserId},
            {UserId: req.query.UserId}
          ]
        }
      }).then(function(data) {
        data = data.map(function(item) {
          if(Number(item.UserId) === Number(req.query.UserId)) {
            return item.FriendId;
          } else {
            return item.UserId;
          }
        });
        res.json(201,data);
      });
    }
  }

