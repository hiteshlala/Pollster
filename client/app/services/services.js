angular.module('scheduler.services', [])

.factory('Auth', function ($http, $location, $window) {
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/signin',
      data: user
    })
    .then(function (res) {
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
      return res.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.scheduler');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.scheduler');
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

  var allUserPolls = [];
  var currentPollIndex;

  // [input] userId
  // [output] 
  // [side effects] add polls to allUserPolls
  var getPollsFromDb = function(userId) {

  };


  // [input] pollId, choice( integer 0-3)
  // [output] 
  // [side effects] updates the poll answer count
  var voteOnPoll = function(pollId, choice) {

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

  };
})

.factory('Friend', function($http) {
  // stores an array of friend objects
  var friends = [];

  // [input] userId
  // [output] 
  // [side effect] friends will contain all friends of userId
  var getFriends = function(userId) {

  };

  // [input] userId, friendId
  // [output]
  // [side effect] posts to '/friends' updating Relationships table
  var addFriendship = function(userId, friendId) {

  };
});
