var bcrypt = require('bcrypt-nodejs');

var db = require('../db').sequelize;
var session = require('express-session');
var Promise = require('bluebird');
var jwt = require('jwt-simple');

module.exports = {
  // [input] req.body to be an object with properties 'name' and 'password'
  // [output] if password is correct returns an object with 'token' and 'userId'
  // [side effects] if no user or incorrect password redirects to '/signin'
  signin: function (req, res, next) {
    db.models.User.findOne({where: {name: req.body.name}})
      .then(function (user) {
        if(!user) {
          res.redirect('/signin');
        }
        bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
          if (err) {
            console.error(err);
            res.redirect('/signin');
          }
          if (isMatch) {
            var token = jwt.encode(user, 'latte');
            res.json({token: token , id: user.id, name: user.name});
          } else {
            return next(new Error('Wrong Password'));
          }
        });
      })
      .catch(function (error) {
        next(error);
      });
  },

  // [input] req.body to be an object with properties 'name', 'email', and 'password'
  // [output] res.json with object with 'token' and 'userId'
  // [side effects] if username does not exists creates a new user else redirects to '/signup'
  signup: function (req, res) {
    var password = req.body.password;

    var cipher = Promise.promisify(bcrypt.hash);
    cipher(password, null, null)
      .then(function(hash) {
        db.models.User.findOrCreate({
          where: { name: req.body.name }
        })
        .spread(function (user, created) {
          console.log('from signup user',user);
          if(created) {
            user.updateAttributes({email: req.body.email, password: hash});
            var token = jwt.encode(user, 'latte');
            res.json({token: token , id: user.id, name: user.name});
          } else {
            // send a message about creating a new username
            // it already exists
            res.json({message: 'username already exists.  choose another', success: false});
            // res.redirect('/signup');
          }
        })
        .catch(function (err) {
          console.error(err);
        });
      });
  },

  // FIXME:  think not necessary - never used
  signout: function (req, res) {
    req.session.destroy(function() {
      res.redirect('/signin');
    });
  },
  // FIXME:  think not necessary - never used
  checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'latte');
      db.models.User.findOne({where: {name: req.body.name}})
        .then(function (foundUser) {
          if (foundUser) {
            res.send(200);
          } else {
            res.send(401);
          }
        })
        .catch(function (error) {
          next(error);
        });
    }
  }

};
