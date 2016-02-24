var db = require('../db');

module.exports = {
  // [input] expects req.body to be an object with properties:
  //  'name', 'private', 'start', 'end', 'creator'
  // [output] returns status code 201
  // [side effects] none
  post: function (req, res) {
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

  // [input] expects req.body to be an object with properties:
  //  'PollId', 'UserId'
  // [output] returns status code 201
  // [side effects] none
  put: function (req, res) {
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
  // [input] expects req.params to have property 'userId'
  // [output] return status code 201 and an array of Polls
  // [side effects] None
  get: function(req, res) {
    // query UserPoll for all polls IDS assossicated with the id
    db.models.UserPoll.findAll({
      where: {
        UserId: req.params.userId
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
