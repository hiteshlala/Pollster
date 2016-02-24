var db = require('../db');

module.exports = {
  post: function (req, res, next) {
    db.models.Poll.create({
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
    db.models.UserPoll.create({
      PollId: req.body.pollId,
      UserId: req.body.userId
    })
    .then(function (success) {
      res.json(201);
    });
  },

  // recieves a user id and returns all polls they are in
  get: function(req, res, next) {
    // query Userpoll for all polls IDS assossicated with the id
    db.models.UserPoll.findAll({
      where: {
        UserId: req.params.userid
      }
    })
    .then(function(result) {
      var pollIdList = result.map(function(pair){ return pair.PollId; });
      return db.models.Poll.findAll({
        where : {
          id: { $in: pollIdList }
        }
      });
    })
    .then(function(listOfPolls) {
      res.status(200).send(listOfPolls);
    });
  }
};
