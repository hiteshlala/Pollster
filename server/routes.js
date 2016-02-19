var controller = require('./controller');
var router = require('express').Router();
var friends = require('./controller/friendsController.js')

// router.get('/signin', controller.signin);

// router.post('/signup', controller.signup);

// router.get('/users', controller.users.get);

// router.get('/events/:username', controller.events.get);

// router.post('/events', contoller.events.post);

// router.put('/events', controller.events.put);

router.get('/friends', friends.friends.get);

router.post('/friends', friends.friends.post);

module.exports = router;