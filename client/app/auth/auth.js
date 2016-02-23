angular.module('scheduler.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = function () {
    console.log('signin function works');
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.scheduler', token);
        $location.path('/');
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  $scope.signup = function () {
    console.log('signup function works');
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.scheduler', token)
        $location.path('/');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});