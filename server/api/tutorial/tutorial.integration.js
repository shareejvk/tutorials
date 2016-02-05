'use strict';

var app = require('../..');
import request from 'supertest';

var newTutorial;

describe('Tutorial API:', function() {

  describe('GET /api/tutorials', function() {
    var tutorials;

    beforeEach(function(done) {
      request(app)
        .get('/api/tutorials')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tutorials = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      tutorials.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/tutorials', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tutorials')
        .send({
          name: 'New Tutorial',
          info: 'This is the brand new tutorial!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTutorial = res.body;
          done();
        });
    });

    it('should respond with the newly created tutorial', function() {
      newTutorial.name.should.equal('New Tutorial');
      newTutorial.info.should.equal('This is the brand new tutorial!!!');
    });

  });

  describe('GET /api/tutorials/:id', function() {
    var tutorial;

    beforeEach(function(done) {
      request(app)
        .get('/api/tutorials/' + newTutorial._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tutorial = res.body;
          done();
        });
    });

    afterEach(function() {
      tutorial = {};
    });

    it('should respond with the requested tutorial', function() {
      tutorial.name.should.equal('New Tutorial');
      tutorial.info.should.equal('This is the brand new tutorial!!!');
    });

  });

  describe('PUT /api/tutorials/:id', function() {
    var updatedTutorial;

    beforeEach(function(done) {
      request(app)
        .put('/api/tutorials/' + newTutorial._id)
        .send({
          name: 'Updated Tutorial',
          info: 'This is the updated tutorial!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTutorial = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTutorial = {};
    });

    it('should respond with the updated tutorial', function() {
      updatedTutorial.name.should.equal('Updated Tutorial');
      updatedTutorial.info.should.equal('This is the updated tutorial!!!');
    });

  });

  describe('DELETE /api/tutorials/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/tutorials/' + newTutorial._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when tutorial does not exist', function(done) {
      request(app)
        .delete('/api/tutorials/' + newTutorial._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
