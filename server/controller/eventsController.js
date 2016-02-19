var db = require('../db');

var events = {
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
  }
}

module.exports = events;

// {
//   "name": "birthday",
//   "private": 0,
//   "start": "2016-02-19",
//   "end": "2016-02-20",
//   "creator": "oliver"
// }