angular.module('scheduler.calendar', [])

.controller('calendarController', function ($scope, $location, Events) {
  $scope.myEvents = [];
  $scope.allEvents = [];
  $scope.myId = 4;// session id
  $scope.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  function init () {
    $scope.getmine();
  }
  $scope.getmine = function () {
    Events.getEvents($scope.myId)
      .then(function (events) {
        console.log('events:', events);
        $scope.myEvents = Events.myEvents;
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  init();


  $scope.getfriends = function () {
    Events.getEvents($scope.friendID)
      .then(function () {
        $scope.allEvents = Events.allEvents;
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});
// .factory('Events', function ($http) {
//   var events = {};
//   events.eventFriends = [];
//   events.myID = 4;
//   events.myEvents = [];
//   events.allEvents = [];
//   events.getEvents = function (id) {
//     var route = '/events/' + id;
//     return $http({
//       method: 'GET',
//       url: route
//     })
//     .then(function (resp) {
//       if(id === events.myID) {
//         events.myEvents = resp.body;
//       } else {
//         events.allEvents.concat(resp.body);
//       }
//     });
//   };
//   return events;
//
// })
// .factory('Friends', function ($http) {
//   var friends = {};
//   friends.allMyFriends = [];
//   // events.eventFriends = [];
//   friends.getFriends = function (userID) {
//     var route = '/friends/';
//     return $http({
//       method: 'GET',
//       url: route,
//       params: {userId: userID}
//     })
//     .then(function (resp) {
//         friends.allMyFriends = resp.body;
//       });
//   };
//   return friends;
// });
