var Sequelize = require('sequelize');
var db = new Sequelize('latte', 'root', '123');

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

User.belongsToMany(Event, {through: 'Notifications'});
Event.belongsToMany(User, {through: 'Notifications'});

User.belongsToMany(User, {as: 'Friend', through: 'Relationships' });

db.sync();

module.exports = db;