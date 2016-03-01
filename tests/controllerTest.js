// a test suite to make sure that the controller functions 
// do what they supposed to

var expect = require('chai').expect;
var db = require('../server/db');
var controller = require('../server/controller');

var request = require('supertest');

var url = "localhost:8080";

describe('users controller', function() {

  it('should add a user', function(done) {
    var newName = (new Date()).toString();
    var time = 5000;
    while(time) { time--; }
    request(url)
      .post('/signup')
      .field('name', newName)
      .field('email', newName)
      .field('password', newName)
      .expect(function(response){
        if(response.session.user === newName) return false;
        else return 'failed to add user';
      })
      .end(function(err, response) {
        done();
      });
  });



  it('should get alll users', function(done) {
    request(url)
      .get('/users')
      .expect(function(response){
        var data = JSON.parse(response.text);
        console.log('users from get:', data);
        if(data.length > 0) return false;
        else return "failed to retrieve users";
      })
      .end(function(err, response) {
        done();
      });
  });

});