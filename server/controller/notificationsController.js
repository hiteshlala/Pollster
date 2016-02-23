var db = require('../db');

module.exports = {
  //receives an object in request body with an array of 
  //invited users' ids and the event id.
  //add entry for each user that was invited
  post: function(req, res, next) {
    var allNotifications = req.body.invitedUsers.map(function(item) {
      return {
        UserId: item,
        EventId: req.body.EventId
      };
    });
    db.models.Notifications.bulkCreate(allNotifications)
    .then(function(result) {
      res.json(201);
    });
  },

  //delete the entry after user has rejected invite
  delete: function(req, res, next) {
    //req.body should contain an object with
    //UserId property and a confirm property.
    if(req.body.confirm) {
      db.models.UserEvent.create({
        EventId: req.body.EventId,
        UserId: req.body.UserId
      });
    }
    db.models.Notifications.destroy({
      where: {
        UserId: req.body.UserId,
        EventId: req.body.EventId
      }
    })
    .then(function(result) {
      res.status(200).send(result);
    });
  },

  //return all notifications with the usersID
  //receive req.params with userId.
  get: function(req, res, next) {
    db.models.Notifications.findAll({
      where: {UserId: req.params.userid}
    })
    .then(function(result) {
      res.status(200).send(result);
    });
  }
};

