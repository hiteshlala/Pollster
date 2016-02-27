var db = require('../db').sequelize;

var CHOICE_KEYS = [
'choice0Count',
'choice1Count',
'choice2Count',
'choice3Count'
];

module.exports = {
  // [input] expects req.body to be an object with properties:
  //  'name', 'creator', 'creatorId', 'answer'
  // [output] returns status code 201
  // [side effects] adds new Poll to Poll table
  //  empty answers will add null to database table
  post: function (req, res) {
    var pollId;
    db.models.Poll.create({
      name: req.body.name,
      creator: req.body.creator,
      creatorId: req.body.creatorId,
      choice0: req.body.answer[0],
      choice0Count: 0,
      choice1: req.body.answer[1],
      choice1Count: 0,
      choice2: req.body.answer[2],
      choice2Count: 0,
      choice3: req.body.answer[3],
      choice3Count: 0
    })
    // returns Relationship rows that belongs to creator
    .then(function (poll) {
      pollId = poll.id;
      return db.models.Relationships.findAll({
        where: {
          $or: [
            {FriendId: req.body.creatorId},
            {UserId: req.body.creatorId}
          ]
        }
      });
    })
    // returns an array of creators friends userIds
    .then(function (data) {
      return data.map(function (item) {
        if(Number(item.UserId) === Number(req.body.creatorId)) {
          return item.FriendId;
        } else {
          return item.UserId;
        }
      });
    })
    // returns an array of object used to create UserPoll rows
    .then(function (data) {
      data.push(req.body.creatorId);
      return data.map(function (id) {
        return {
          UserId: id,
          PollId: pollId
        };
      });
    })
    .then(function (data) {
      return db.models.UserPoll.bulkCreate(data);
    })
    .then(function () {
      res.json(201);
    });
  },

  // FIXME: change put request

  // [input] expects req.body to have properties 'userId', 'pollId', 'choice'
  // [output] on success, returns status code 201
  // [side effects] increments count for given choice on given poll
  put: function (req, res) {
    console.log(req.body);
    if (req.body.choice < 0 ||
      req.body.choice >= CHOICE_KEYS.length) {
      res.json(404, {});
    }
    var key = CHOICE_KEYS[req.body.choice];

    db.models.Poll.find({
      where: {
        id: req.body.pollId
      }
    })
    .then(function (poll) {
      var obj = {};
      obj[key] = poll[key] + 1;
      return poll.updateAttributes(obj)
    })
    .then(function (poll) {
      res.json(201, poll);
    })
    .catch(function (error) {
      res.json(404, error);
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
  },

  getOne: function(req, res) {
    // query UserPoll for all polls IDS assossicated with the id
    db.models.Poll.findOne({
      where: {
        id: req.params.pollId
      }
    })
    .then(function(poll) {
      res.status(200).send(poll);
    });
  }
};
