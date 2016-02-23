var auth = require('./authController.js');
var events = require('./eventsController.js');
var friends = require('./friendsController.js');
var users = require('./userController.js');
var notifications = require('./notificationsController.js');


module.exports = {
  auth: auth,
  users: users,
  friends: friends,
  events: events,
  notifications: notifications
}