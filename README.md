# Pollster

> A way to solicit your friends opinions on a decision

## Team

  - __Product Owner__: Brian Ronaghan
  - __Scrum Master__: Oliver Huang
  - __Development Team Members__: Michael Cheung, Hitesh Lala

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Project Details](#project-details)
      1. [Authentication](#authentication)
      1. [Server Design](#server-design)
      1. [Database Design](#database-design)
      1. [Client Design](#client-design)
    1. [Roadmap](#roadmap)
      1. [Features To Be Added](#features-to-be-added)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

1. Create and account
1. Add friends from user base
1. Create a poll - and see what your friends think!

## Requirements

### Server Side
- Node 0.10.x
- bcrypt-nodejs 0.0.3
- body-parser 1.15.0
- express 4.13.4
- express-session 1.13.0
- grunt 0.4.5
- jwt-simple 0.4.1
- mysql 2.10.2
- sequelize 3.19.3

### Client Side
- angular 1.5.0
- angular-route 1.5.0

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```
### Project Details

#### Authentication

Authentication was implemented using JWT and bcrypt-nodejs. We use a username-password method for authentication,
which allows users to pick a username and password during sign up. The passwords are then hashed via bcrypt and
stored on our servers. To remember that a user is logged in, the server sends JWT tokens to the client, which
stores them in their browsers local storage. We also store the usernames and id of users in local storage.

#### Server Design

Server was implemented using Node and Express. The API is described below:

1. __/__ GET
  
  Serves static page index.html

1. __/signin__  POST

 Request Body: { name: string, password: password }

 Searches User table if not found redirects to signin. If found compares passwords if incorrect redirects signin if correct it returns token.

 Controller: controller.auth.signin

1. __/signup__ POST

 Request Body: { name: string, email: string, password: string }

 Creates a user in the Users table (cryptifies password) then creates token and returns token and userId to client, ensures no duplicate username.

 Controller: controller.auth.signup

1. __/users__ GET

 Returns an array with object for each user in database.

 Controller: controller.users.get

1. __/polls/:userId__ GET
 
 Request Params: { userId: number }
 
 Returns an array of objects of polls that user is assosciated with.

 Controller: controller.polls.get

1. __/polls__ POST

 Request Body: { name: event-name,  creator: string, creatorId: number,  answer: array-of-strings}

 Adds a poll to Polls table and adds an entry in UserPoll table for user and each user friend.

 Controller: controller.polls.post

1. __/polls__ PUT

 Request Body: { userId: number, pollId: number, choice: number }

 Increments count for a particular choice of a particular poll in the Poll table.

 Controller: controller.polls.put

 1. __/polls/:pollId__ DELETE

 Request Params: { pollId: number }

 Deletes entry in Poll table with pollId and deletes all occurrances of pollId in UserPoll table.

 Controller: controller.polls.delete

 1. __/onePoll/:pollId__ GET

  Request Params: { pollId: number }

  Queries database and returns a poll object containing poll with pollId.

  Controller: controller.polls.getOne

1. __/friends/:userId__ GET

 Request Params: { userId: number }

 Returns an array of Ids of all the users friends.

 Controller: controller.friends.get

1. __/friends__ POST

 Request Body: { friendId: number, userId: number }

 Adds userid and user2id to Relationships table. Returns a copy of entry.

 Controller: controller.friends.post


#### Database Design

Using Mysql database with Sequelize.  There are four tables in the database their names and schema follow:

1. __Users__
  * id - a number unique
  * name - a string
  * email - a string
  * password - a hashed string
 
1. __Polls__
  * id - a number unique
  * name - a string
  * creator - a string
  * creatorId - a number
  * choice0 - a string
  * choice0Count - a number
  * choice1 - a string
  * choice1Count - a number
  * choice2 - a string
  * choice2Count - a number
  * choice3 - a string
  * choice3Count - a number
  * createdAt - a date time
  
1. __Relationships__
  * UserId - a number
  * FriendId - a number

1. __UserPoll__ 
  * PollId - a number
  * UserId - a number

#### Client Design

Front end was built using Angular.  The Angular routes are shown below:

|  URL      | Controller            | Template            | Authenticate |
|:---------:|:---------------------:|:-------------------:|:------------:|
| /         | HomeController        | homeView.html       | TRUE         |
| /signin   | AuthController        | signin.html         | FALSE        |
| /signup   | AuthController        | signup.html         | FALSE        |
| /polls    | PollController        | pollView.html       | TRUE         |
| /create   | CreatePollController  | createPollView.html | TRUE         |
| /friends  | FriendsController     | friendsView.html    | TRUE         |
| /landing  | (none)                | landingView.html    | FALSE        |
NOTE: when authentication fails, we redirect to landing

### Roadmap

[View the current project issues](https://github.com/TepidLatteGreenfield/tepidLatte2/issues)

#### Features To Be Added
 * Ability to view and create anonymous polls from landing page without creating an account
 * Prevent users from voting multiple times on a poll
 * Use sockets to allow real time updates of pollView



## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
