angular.module('scheduler.services', [])

.factory('Auth', function ($http) {
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/signin',
      data: user
    })
    .then(function (res) {
      return res.data;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/signup',
      data: user
    })
    .then(function (res) {
      return res.data;
    });
  };

  return {
    signin: signin,
    signup: signup
  }
});