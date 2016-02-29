angular.module('pollster.home', [])
.controller('HomeController', function ($scope, $window, Auth, Poll) {
  $scope.userPolls;
  $scope.friendPolls;

  $scope.currentUser = $window.localStorage.getItem('com.name');

  $scope.signout = function () {
    Auth.signout();
  };
  
  $scope.setPollId = function(pollId) {
    $window.localStorage.setItem('currentPollId', pollId);
  };


  Poll.getPollsFromDb($window.localStorage['com.id'])
  .then(function (polls) {
    $scope.userPolls = polls.user;
    $scope.friendPolls = polls.friend;
  });

});
