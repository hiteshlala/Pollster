angular.module('scheduler.home', [])
.controller('HomeController', function ($scope, Auth) {
  $scope.signout = function () {
    Auth.signout();
  }
});
