var db = require('../db').sequelize;

module.exports = {
  // [input] recieves userId and friendId on req.body
  // [output] none
  // [side effects] adds a friend relationship into Relationships
  // ALSO adds to UserPoll join table all polls associated with the other user
  post: function(req, res) {
    var user1 = Number(req.body.userId);
    var user2 = Number(req.body.friendId);
    db.models.Relationships.create({
      UserId: user1,
      FriendId: user2
    })
    // after creating the friend relationship, find all polls CREATED BY user 2
    .then(function (user) {
      var polls = db.models.Poll.findAll({
        where: {
          creatorId: user2
        }
      });
      // then, with all those polls, create an array of all the poll ids
      return polls.map(function (poll) {
        return poll.id;
      });
    })
    // with all pollIds created by user 2, make an array of objects that have user1's id and the given poll id
    .then(function (listOfPollIds) {
      return listOfPollIds.map(function (pollId) {
        return {
          UserId: user1,
          PollId: pollId
        };
      });
    })
    // taken that list of user Poll associations between user1 and all of user2's polls, create them in the UserPoll join table
    .then(function (newPairs) {
      return db.models.UserPoll.bulkCreate(newPairs);
    })
    // after creating relationships between user1 and user2's polls, find all polls created by user 1
    .then(function (newRels) {
      var polls = db.models.Poll.findAll({
        where: {
          creatorId: user1
        }
      });
      // then, with all those polls, create an array of all the poll ids
      return polls.map(function (poll) {
        return poll.id;
      });
    })
    // then, given all pollIds created by user1, create an array of objects with userid as 2, and the given pollid
    .then(function (listOfPollIds) {
      return listOfPollIds.map(function (pollId) {
        return {
          UserId: user2,
          PollId: pollId
        };
      });
    })
    // taken that list of user Poll associations between user1 and all of user2's polls, create them in the UserPoll join table
    .then(function (newOppPairs) {
      return db.models.UserPoll.bulkCreate(newOppPairs);
    })
    .then(function () {
      res.json(201);
    });
  },

  // [input] recieves a user id on req.params
  // [output] returns an array of firend objects
  // [side effects] none
  get: function(req, res) {
    req.params.userId = Number(req.params.userId);
    db.models.Relationships.findAll({
      where: {
        $or: [
          {FriendId: req.params.userId},
          {UserId: req.params.userId}
        ]
      }
    })
    .then(function(data) {
      data = data.map(function(item) {
        if(Number(item.UserId) === Number(req.params.userId)) {
          return item.FriendId;
        } else {
          return item.UserId;
        }
      });
      return data;
    })
    .then(function(userIds) {
      return db.models.User.findAll({
        attributes: [ 'name', 'email', 'id'],
        where: {
          id: { $in: userIds }
        }
      });
    })
    .then(function(data) {
      res.json(201,data);
    });
  }
};
