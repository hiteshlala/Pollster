CREATE DATABASE latte;

USE latte

CREATE TABLE users (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(15) NOT NULL
);

CREATE TABLE events (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  private  int NOT NULL,
  start datetime,
  end datetime,
  creator varchar(50)
);

CREATE TABLE events_users (
  user_id int NOT NULL,
  event_id int NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(event_id) REFERENCES events(id)
);

CREATE TABLE user_relationships(
  user1_id int NOT NULL,
  user2_id int NOT NULL,
  FOREIGN KEY(user1_id) REFERENCES users(id),
  FOREIGN KEY(user2_id) REFERENCES users(id)
);


