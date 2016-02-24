var Sequelize = require('sequelize');
var db = new Sequelize('latte', 'root', '123');

// Declares the schema for a user

var User = db.define('User', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  createdAt: false,
  updatedAt: false
});

// Declares the schema for a given poll, including 4 choices and a var to keep track of the count
var Poll = db.define('poll', {
  name: Sequelize.STRING,
  creator: Sequelize.STRING,
  choice1: Sequelize.STRING,
  choice1count: Sequelize.INTEGER,
  choice2: Sequelize.STRING,
  choice2count: Sequelize.INTEGER,
  choice3: Sequelize.STRING,
  choice3count: Sequelize.INTEGER,
  choice4: Sequelize.STRING,
  choice4count: Sequelize.INTEGER
}, {
  createdAt: false,
  updatedAt: false
});

// Declares the join table that creates a relationship between a USER and a POLL
User.belongsToMany(Poll, {through: 'UserPoll'});
Poll.belongsToMany(User, {through: 'UserPoll'});

// Declares the join table that creates friendships between two users
User.belongsToMany(User, {as: 'Friend', through: 'Relationships' });

db.sync();

module.exports = db;
