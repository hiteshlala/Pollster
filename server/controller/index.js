var auth = require('./authController.js');
var polls = require('./pollsController.js');
var friends = require('./friendsController.js');
var users = require('./userController.js');


module.exports = {
  auth: auth,
  users: users,
  friends: friends,
  polls: polls,
};
