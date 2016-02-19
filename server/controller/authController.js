var bcrypt = require('bcrypt-nodejs');

var db = require('../db');
var session = require('express-session');
var Promise = require('bluebird');

module.exports = {
  signin: function (req, res) {
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
            req.session.regenerate(function() {
              console.log("good pass match");
              req.session.user = req.body.name;
              //
              res.redirect('/');
            });
          } else {
            console.log('bad pass');
            res.redirect('/signin');
          }
        });
      });
  },
  signup: function (req, res) {
    var password = req.body.password;

    var cipher = Promise.promisify(bcrypt.hash);
    cipher(password, null, null)
      .then(function(hash) {
        db.models.User.create({name: req.body.name, email: req.body.email, password: hash})
        .then(function (user) {
          console.log("succ created user ", user);
          req.session.regenerate(function() {
            req.session.user = req.body.name;
            res.redirect('/');
          });
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
  checkuser: function (req, res){
    if (!req.session) {
      res.redirect('/login');
    } else {
      next();
    }
  }
};
