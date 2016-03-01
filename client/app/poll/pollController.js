// POLL controller
angular.module('pollster.poll', [])

.controller('PollController', function ($window, $scope, $location, Poll, Auth) {
  $scope.currentUser = $window.localStorage.getItem('com.name');
  $scope.signout = function () {
    Auth.signout();
  };
  
  $scope.poll = {};
  var init = function () {
    $scope.getpoll();
  };

  // [input] none
  // [output] none
  // [side effects] makes get request to server for the current poll based on the current poll id on the window object
  // also sets $scope.poll that current poll
  $scope.getpoll = function() {
    // for this to work, homeController needs to do this before redirecting: $window.setItem('currentPollId' , // the id user clicked);
    // also, when the homeController first displays the home view, it first must remove the '$window.currentPollId' item
    Poll.getPollById($window.localStorage.getItem('currentPollId'))
    .then(function (poll) {
      $scope.poll = poll;
    });
  };

  // [input] the choice clicked by user, sent in from the expression in the view
  // [output] none
  // [side effects], sends a put request to increment the vote count on the selected poll,
  // also receives and the newly update poll from the server and resets the $scope.poll to that new version
  $scope.vote = function (choice) {
   Poll.voteOnPoll($window.localStorage.getItem('currentPollId'), choice)
    .then(function(resp) {
      $scope.poll = resp.data;
    });
  };

  // [input] none
  // [output] boolean representing whether the current user is the poll creator
  // this will allow us to only display vote buttons if the user is NOT the creator
  $scope.isusercreator = function () {
    return Number($window.localStorage.getItem('com.id')) === Number($scope.poll.creatorId);
  };

  
  // [input] the pollId to be deleted
  // [output] none
  // [side effects] delets poll from all database tables and redirects to homeView
  $scope.deletePoll = function(pollId) {
    Poll.deletePoll(pollId)
    .then(function() {
      $location.path('/');
    });
  };

  $scope.getUser = function() {
    return $window.localStorage.getItem('com.name');
  };
  
  init();

});
