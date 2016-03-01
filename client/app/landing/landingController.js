angular.module('pollster.landing', [])
.controller('LandingController', function ($scope, $location) {

  $scope.goToSignIn = function () {
    $location.path('/signin');
  };
  
  $scope.goToSignUp = function() {
    $location.path('/signup');
  };
});
