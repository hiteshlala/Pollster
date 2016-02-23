angular.module('scheduler.auth', [])

.controller('AuthController', function ($scope, Auth) {
  $scope.user = {};

  $scope.signin = function () {
    console.log('signin function works');
    Auth.signin($scope.user);
  }

  $scope.signup = function () {
    console.log('signup function works');
    Auth.signup($scope.user);
  }
});