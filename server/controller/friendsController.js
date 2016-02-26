var db = require('../db');

module.exports = {
  // [input] recieves userId and friendId on req.body
  // [output] returns the entry
  // [side effects] adds a friend relationship into Relationships
  post: function(req, res) {
    var user1 = req.body.userId;
    var user2 = req.body.friendId;
    db.models.Relationships.create({
      UserId: user1,
      FriendId: user2
    })
    .then(function (user) {
      return db.models.UserPoll.findAll({
        where: {
          UserId: user2
        }
      });
    })
    .then(function (listOfPollAssociationsToAdd) {
      return listOfPollAssociationsToAdd.map(function (pollAssociation) {
        return {
          UserId: user1,
          PollId: pollAssociation.PollId
        };
      });
    })
    .then(function (newPairs) {
      return db.models.UserPoll.bulkCreate(newPairs);
    })
    .then(function (newRels) {
      return db.models.UserPoll.findAll({
        where: {
          UserId: user1
        }
      });
    })
    .then(function (otherPollAssociations) {
      return otherPollAssociations.map(function (newPollAssociation) {
        return {
          UserId: user2,
          PollId: newPollAssociation.PollId
        };
      });
    })
    .then(function (otherNewPairs) {
      return db.models.UserPoll.bulkCreate(otherNewPairs);
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
