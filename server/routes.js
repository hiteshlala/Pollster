var controller = require('./controller');
var router = require('express').Router();

router.get('/', function(req,res) {
  res.render('index');
});

router.post('/signin', controller.auth.signin);

router.post('/signup', controller.auth.signup);

router.get('/users', controller.users.get);

router.get('/polls/:userid', controller.polls.get);

router.post('/polls', controller.polls.post);

router.put('/polls', controller.polls.put);

router.get('/friends/:userid', controller.friends.get);

router.post('/friends', controller.friends.post);

module.exports = router;
