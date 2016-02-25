angular.module('pollster.services', [])

.factory('Auth', function ($http, $location, $window) {
  var userId;

  var getUserId = function () {
    return userId;
  }

  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/signin',
      data: user
    })
    .then(function (res) {
      userId = res.data.userId;
      return res.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/signup',
      data: user
    })
    .then(function (res) {
      userId = res.data.userId;
      return res.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.pollster');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.pollster');
    $location.path('/landing');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout,
    getUserId: getUserId
  };
})

.factory('Poll', function($http) {

  var allUserPolls = [];
  var currentPollIndex;

  // [input] userId
  // [output]
  // [side effects] add polls to allUserPolls
  var getPollsFromDb = function(userId) {

  };

  var returnUserPolls = function() {
    return allUserPolls;
  }

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
      allUserPolls[currentPollIndex] = poll;
      return poll;
    });
  };

  // [input] indexof array
  // [output] undefined
  // [side effects] currentPollIndex gets set
  var setCurrentPollIndex = function(index) {
    currentPollIndex = index;
  };

  // gets called when someone clicks on a poll - might not need it
  // [input] none
  // [output] pollObject
  // [side effects]
  var getCurrentPoll = function() {
    return allUserPolls[currentPollIndex];
  };

  // [input] recieves object with poll data
  // [output]
  // [side effects] sends a post request to /polls put
  var createPoll = function(pollObject) {
    return $http({
      method: 'POST',
      url: '/polls',
      data: pollObject
    })
    .then(function (res) {
      // To be determined: do we handle a redirect here to home view?
      console.log(res);
    });

  };

  return {
    getPollsFromDb: getPollsFromDb,
    voteOnPoll: voteOnPoll,
    setCurrentPollIndex: setCurrentPollIndex,
    getCurrentPoll: getCurrentPoll,
    createPoll: createPoll,
    returnUserPolls: returnUserPolls
  };
})

.factory('Friend', function($http) {
  // stores an array of friend objects
  var friends = [];

  // [input] userId
  // [output]
  // [side effect] friends will contain all friends of userId
  var getFriendsFromDb = function(userId) {

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

  return {
    getFriends: getFriends,
    addFriendship: addFriendship,
    getFriendsFromDb: getFriendsFromDb
  };
});
