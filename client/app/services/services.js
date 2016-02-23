angular.module('scheduler.services', [])

.factory('Auth', function ($http, $location, $window) {
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/signin',
      data: user
    })
    .then(function (res) {
      return res.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/signup',
      data: user
    })
    .then(function (res) {
      return res.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.scheduler');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.scheduler');
    $location.path('/landing');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  }
});