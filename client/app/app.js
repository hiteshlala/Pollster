angular.module('scheduler', [
  'scheduler.services',
  'scheduler.auth',
  'ngRoute'
])
.config(function ($routeProvider) {
  $routeProvider
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    });
})