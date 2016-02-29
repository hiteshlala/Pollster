angular.module('pollster.services', [])

.factory('Auth', function ($http, $location, $window) {
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/signin',
      data: user
    })
    .then(function (res) {
      return {token: res.data.token, id: res.data.id, name: res.data.name};
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/signup',
      data: user
    })
    .then(function (res) {
      return {token: res.data.token, id: res.data.id, name: res.data.name};
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.pollster');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.pollster');
    $window.localStorage.removeItem('com.id');
    $window.localStorage.removeItem('com.name');
    $location.path('/landing');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
})

.factory('Poll', function($http) {

  // [input] userId
  // [output] an array of all polls associated with 'userId'
  // [side effects] 
  var getPollsFromDb = function(userId) {
    return $http({
      method: 'GET',
      url: '/polls/' + userId
    })
    .then(function(res) {
      var result = { user: [], friend: [] };
      res.data.forEach(function (poll) {
        if (poll.creatorId === Number(userId)) {
          result.user.push(poll);
        } else {
          result.friend.push(poll);
        }
      });
      return result;
    });
  };

  // [input] pollId, choice( integer 0-3)
  // [output] updated poll
  // [side effects] updates the poll answer count
  var voteOnPoll = function(pollId, choice) {
    return $http({
      method: 'PUT',
      url: '/polls',
      data: {pollId: pollId, choice: choice}
    })
    .then(function (poll) {
      return poll;
    });
  };

  // [input] pollId
  // [output] poll object associated with 'pollId'
  // [side effects]
   var getPollById = function(pollId) {
      return $http({
        method: 'GET',
        url: '/onePoll/' + pollId,
      })
      .then(function (res) {
        return res.data;
      });
    };

  // [input] recieves object with poll data
  // [output]
  // [side effects] creates a poll in the database
  var createPoll = function(pollObject) {
    return $http({
      method: 'POST',
      url: '/polls',
      data: pollObject
    });
  };


  // [input] recieves pollId
  // [output] 
  // [side effects] deletes a poll in the database from all tables
  var deletePoll = function(pollId) {
    return $http({
      method: 'DELETE',
      url: '/polls/' + pollId
    });
  };

  return {
    getPollsFromDb: getPollsFromDb,
    voteOnPoll: voteOnPoll,
    getPollById: getPollById,
    createPoll: createPoll,
    deletePoll: deletePoll
  };
})

.factory('Friend', function($http) {
  // stores an array of friend objects
  var allUsers = [];
  var friends = [];
  // [input] userId
  // [output]
  // [side effect] friends will contain all friends of userId
  var getFriendsFromDb = function(userId) {
    var route = '/friends/' + userId.toString();
    return $http({
      method: 'GET',
      url: route
    })
    .then(function (data) {
      friends = data;
      return;
    });
  };
var getAllUsersFromDb = function () {
  return $http({
    method: 'GET',
    url: '/users'
  })
  .then(function (data) {
    allUsers = data;
    return;
  });
};
  // [input] userId, friendId
  // [output]
  // [side effect] posts to '/friends' updating Relationships table
 var addFriendship = function(userId, friendId) {
    return $http({
      method: 'POST',
      url: '/friends',
      data: {friendId: friendId, userId: userId}
    });
  };

  var getFriends = function( ) {
    return friends;
  };
  var getUsers = function () {
    return allUsers;
  };

  return {
    getFriends: getFriends,
    addFriendship: addFriendship,
    getFriendsFromDb: getFriendsFromDb,
    getUsers: getUsers,
    getAllUsersFromDb: getAllUsersFromDb
  };
});
