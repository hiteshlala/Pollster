angular.module('pollster.createPoll', [])

.controller('CreatePollController', function($scope, Poll, $location, $window, Auth) {
  $scope.currentUser = $window.localStorage.getItem('com.name');

  $scope.signout = function () {
    Auth.signout();
  };

  $scope.createPoll = function() {
    var pollObject = {
      name: $scope.poll.name,
      creator: $window.localStorage.getItem('com.name'),
      creatorId: $window.localStorage.getItem('com.id'),
      answer: [
        $scope.poll.answer[0],
        $scope.poll.answer[1],
        $scope.poll.answer[2],
        $scope.poll.answer[3]
      ]
    };
    Poll.createPoll(pollObject);
    $location.path('/');
  };

});
