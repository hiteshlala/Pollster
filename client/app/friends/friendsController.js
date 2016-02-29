// friends controller
angular.module('pollster.friend', [])

.controller('FriendsController', function ($scope, $window, Friend, Auth) {

  $scope.currentUser = $window.localStorage.getItem('com.name');
  
  $scope.signout = function () {
    Auth.signout();
  };
  
  //var to hold the current users id from the the localStorage
  var userId = $window.localStorage.getItem('com.id');

  //[input] none
  //[output] none
  //[side effects] initializes the friendsView to show list of all friends.
  var init = function() {
    $scope.getFriends = Friend.getFriendsFromDb(userId)
    .then(function() {
      $scope.allFriends = Friend.getFriends();
    });
  }

  init();

  //[input] the id of the friend to be added.
  //[output] none
  //[side effects] adds the friend to the current users friend list.
  $scope.addFriend = function(friendId) {
    Friend.addFriendship(userId,friendId)
    .then(function() {
      init();
    });
  };

  //[input] none
  //[output] none
  //[side effects] shows and hides the list of all users on click
  $scope.clicked = false;
  $scope.getUsers = function() {
    if(!$scope.clicked) {
      $scope.clicked = true;
    } else {
      $scope.clicked = false;
    }
    Friend.getAllUsersFromDb()
    .then(function() {
      $scope.allUsers = Friend.getUsers();
    });
  };
});
