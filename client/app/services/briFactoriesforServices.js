
.factory('Events', function ($http) {
  var events = {};
  events.eventFriends = [];
  events.myID = 4;
  events.myEvents = [];
  events.allEvents = [];
  events.getEvents = function (id) {
    var route = '/events/' + id;
    return $http({
      method: 'GET',
      url: route
    })
    .then(function (resp) {
      if(id === events.myID) {
        events.myEvents = resp.body;
      } else {
        events.allEvents.concat(resp.body);
      }
    });
  };
  return events;

})
.factory('Friends', function ($http) {
  var friends = {};
  friends.allMyFriends = [];
  // events.eventFriends = [];
  friends.getFriends = function (userID) {
    var route = '/friends/';
    return $http({
      method: 'GET',
      url: route,
      params: {userId: userID}
    })
    .then(function (resp) {
        friends.allMyFriends = resp.body;
      });
  };
  return friends;
});
