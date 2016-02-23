var bcrypt = require('bcrypt-nodejs');

var db = require('../db');
var session = require('express-session');
var Promise = require('bluebird');
var jwt = require('jwt-simple');

module.exports = {

  // Expects req.body to be an Object with properties 'name' and 'password'
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
            var token = jwt.encode(user, 'latte')
            console.log('YOOoooooooooooooooooooooooooo',token)
            res.json({token: token});
          } else {
            return next(new Error('No user'));
          }
        });
      })
      .catch(function (error) {
        next(error);
      });
  },

  // Expects req.body to be an Object with properties 'name', 'email', and 'password'
  signup: function (req, res) {
    var password = req.body.password;

    var cipher = Promise.promisify(bcrypt.hash);
    cipher(password, null, null)
      .then(function(hash) {
        db.models.User.create({name: req.body.name, email: req.body.email, password: hash})
        .then(function (user) {
          var token = jwt.encode(user, 'latte');
          res.json({token: token});
        })
        .catch(function (err) {
          console.error(err);
        });
      });
  },
  signout: function (req, res) {
    req.session.destroy(function() {
      res.redirect('/signin');
    });
  },
  checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'secret');
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
