var Sequelize = require('sequelize');
var db = new Sequelize('latte', 'root', '');

var User = db.define('User', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  createdAt: false,
  updatedAt: false
});

var Event = db.define('Event', {
  name: Sequelize.STRING,
  private: Sequelize.INTEGER,
  start: Sequelize.DATE,
  end: Sequelize.DATE,
  creator: Sequelize.STRING
}, {
  createdAt: false,
  updatedAt: false
});

User.belongsToMany(Event, {through: 'UserEvent'});
Event.belongsToMany(User, {through: 'UserEvent'});

User.belongsToMany(User, {as: 'Friend', through: 'Relationships' });

db.sync();

module.exports = db;