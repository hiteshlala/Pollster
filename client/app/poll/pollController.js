// POLL controller
angular.module('pollster.poll', [])

.controller('PollController', function ($window, $scope, Poll, Auth) {
  $scope.poll = {};
  init = function () {
    $scope.getpoll();
  }
  $scope.getpoll = function() {
    // for this to work, homeController needs to do this before redirecting: $window.setItem('currentPollId' , // the id user clicked);
    // also, when the homeController redirects
    $scope.poll = Poll.getCurrentPoll($window.getItem('currentPollId');
  };
  
  $scope.vote = function (choice) {
   Poll.voteOnPoll($window.currentPoll, choice)
    .then(function(resp) {
      $scope.poll = resp.data;
    }); 
  };
  init();

});
