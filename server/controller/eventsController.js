var db = require('../db');

module.exports = {
  post: function (req, res, next) {
    db.models.Event.create({
      name: req.body.name,
      private: req.body.private,
      start: req.body.start,
      end: req.body.end,
      creator: req.body.creator
    })
    .then(function () {
      res.json(201);
    });
  },

  put: function (req, res, next) {
    console.log(req.body);
    db.models.UserEvent.create({
      EventId: req.body.eventId,
      UserId: req.body.userId
    })
    .then(function (success) {
      res.json(201);
    });
  },

  // recieves a user id and returns all events they are in
  get: function(req, res, next) {
    // query UserEvent for all events IDS assossicated with the id
    db.models.UserEvent.findAll({
      where: {
        UserId: req.params.userid
      }
    })
    .then(function(result) {
      var eventIdList = result.map(function(pair){ return pair.EventId; });
      return db.models.Event.findAll({
        where : {
          id: { $in: eventIdList }
        }
      });
    })
    .then(function(listOfEvents) {
      res.status(200).send(listOfEvents);
    });
  }
};
