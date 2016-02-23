var controller = require('./controller');
var router = require('express').Router();

router.get('/', function(req,res) {
  res.render('index');
});

router.post('/signin', controller.auth.signin);

router.post('/signup', controller.auth.signup);

router.get('/users', controller.users.get);

router.get('/events/:username', controller.events.get);

router.post('/events', controller.events.post);

router.put('/events', controller.events.put);

router.get('/friends/:UserId', controller.friends.get);

router.post('/friends', controller.friends.post);

router.post('/notifications', controller.notifications.post);

router.get('/notifications/:userid', controller.notifications.get);

router.delete('/notifications', controller.notifications.delete);

module.exports = router;
