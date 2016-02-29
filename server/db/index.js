var Sequelize = require('sequelize');

// console.log('from db index ', process.env);
if(process.env.DATABASE_URL) {
  var db = new Sequelize('postgres://dvxetgekpdlqos:wwqFsT4QKy0YkrniumiXwyhvk4@ec2-107-20-148-211.compute-1.amazonaws.com:5432/dd6d1aqr5qsdh1', {
    dialect: 'postgres',
    protocol: 'postgres',
    port: 5432,
    host: 'ec2-107-20-148-211.compute-1.amazonaws.com'
  });
} else {
  var db = new Sequelize('latte', 'root', '');
}

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
var Poll = db.define('Poll', {
  name: Sequelize.STRING,
  creator: Sequelize.STRING,
  choice0: Sequelize.STRING,
  choice0Count: Sequelize.INTEGER,
  choice1: Sequelize.STRING,
  choice1Count: Sequelize.INTEGER,
  choice2: Sequelize.STRING,
  choice2Count: Sequelize.INTEGER,
  choice3: Sequelize.STRING,
  choice3Count: Sequelize.INTEGER
}, {
  updatedAt: false
});

// sets a field in the poll schema that holds the creatorid as a for. key
Poll.belongsTo(User, {foreignKey: 'creatorId'});

// Declares the join table that creates a relationship between a USER and a POLL
User.belongsToMany(Poll, {through: 'UserPoll'});
Poll.belongsToMany(User, {through: 'UserPoll'});
// Declares the join table that creates friendships between two users
User.belongsToMany(User, {as: 'Friend', through: 'Relationships' });

// db.sync();

// module.exports = db;

module.exports = {
  Sequelize: Sequelize,
  sequelize: db,
  User: User,
  Poll: Poll
};