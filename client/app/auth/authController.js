angular.module('pollster.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = function () {
    console.log('signin function works');
    Auth.signin($scope.user)
      .then(function (response) {
        $window.localStorage.setItem('com.pollster', response.token);
        $window.localStorage.setItem('com.id', response.id);
        $window.localStorage.setItem('com.name', response.name);
        $location.path('/');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (response) {
        $window.localStorage.setItem('com.pollster', response.token);
        $window.localStorage.setItem('com.id', response.id);
        $window.localStorage.setItem('com.name', response.name);
        $location.path('/');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});