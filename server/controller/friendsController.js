var db = require('../db');

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
    // after creating the friend relationship, find all polls associated with user 2
    .then(function (user) {
      return db.models.UserPoll.findAll({
        where: {
          UserId: user2
        }
      });
    })
    // taking all polls associated with user 2, create an array of objects that have user1's id and the given poll id
    .then(function (listOfPollAssociationsToAdd) {
      return listOfPollAssociationsToAdd.map(function (pollAssociation) {
        return {
          UserId: user1,
          PollId: pollAssociation.PollId
        };
      });
    })
    // taken that list of user Poll associations between user1 and all of user2's polls, create them in the UserPoll join table
    .then(function (newPairs) {
      return db.models.UserPoll.bulkCreate(newPairs);
    })
    // after creating relationships between user1 and user2's polls, do the opposite:
    .then(function (newRels) {
      // find all pollIds already associated with user 2
      var excludePolls = newRels.map (function (pollRel) {
        return pollRel.PollId;
      });
      // find all polls associated with user 1 THAT HAVEN'T already been associated with user 2
      var pollsOfUser1 =  db.models.UserPoll.findAll({
        where: {
          UserId: user1,
          PollId: {$notIn: excludePolls}
        }
      });
      return pollsOfUser1;
    })
    // then, take the new poll associations, and create new UserPoll objects for each
    .then(function (otherPollAssociations) {
      var newUser2Pairs = otherPollAssociations.map(function (newPollAssociation) {
        return {
          UserId: user2,
          PollId: newPollAssociation.PollId
        };
      });
      return newUser2Pairs;
    })
    // Then bulk create the new user 2 associations with any remaining user 1 polls
    .then(function (newUser2Pairs) {
      return db.models.UserPoll.bulkCreate(newUser2Pairs);
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
