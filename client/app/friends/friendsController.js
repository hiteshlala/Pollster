// friends controller
angular.module('pollster.friend', [])

.controller('FriendsController', function ($scope, Friend) {
  $scope.friends = [];
  $scope.userId = 0;
  $scope.getFriends = function() {
    $scope.friends = Friend.getFriends();
  };
});
