angular.module('pollster', [
  'pollster.services',
  'pollster.auth',
  'pollster.home',
  'pollster.createPoll',
  'pollster.friend',
  'pollster.poll',
  'pollster.landing',
  'ngRoute'
])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/home/homeView.html',
      controller: 'HomeController',
      authenticate: true
    })
    .when('/landing', {
      templateUrl: 'app/landing/landingView.html'
    })
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .when('/polls', {
      templateUrl: 'app/poll/pollView.html',
      controller: 'PollController',
      authenticate: true
    })
    .when('/create', {
      templateUrl: 'app/createPoll/createPollView.html',
      controller: 'CreatePollController',
      authenticate: true
    })
    .when('/friends', {
      templateUrl: 'app/friends/friendsView.html',
      controller: 'FriendsController',
      authenticate: true
    });

    $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.pollster');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/landing');
    }
  });
});
