/* eslint-disable no-underscore-dangle */

const assert = require('assert');
const request = require('supertest');
const util = require('util');
const debug = require('debug')('demo:server');
const { MongoClient } = require('mongodb');
const app = require('../app');

const mongoUrl = util.format('mongodb://mongo:%s/demo', process.env.MONGO_PORT);

before((done) => {
  MongoClient.connect(mongoUrl, (err, db) => {
    if (err) return done(err);

    debug('connected to mongo');
    app.set('db', db);

    return done();
  });
});

describe('basic tests', () => {
  let lastUser;

  it('should get a collection of users', (done) => {
    request(app)
      .get('/users')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const result = res.body;
        assert.equal(result.success, true);

        return done();
      });
  });

  it('should add a user', (done) => {
    request(app)
      .post('/users')
      .send({ name: 'nodester' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const result = res.body;
        assert.equal(result.success, true);
        assert.equal(result.user.name, 'nodester');
        assert(result.user._id);
        lastUser = result.user;

        return done();
      });
  });

  it('should get a user', (done) => {
    const id = lastUser._id;

    debug(id);

    request(app)
      .get(`/users/${id}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const result = res.body;
        assert.equal(result.success, true);
        assert.equal(result.user.name, lastUser.name);
        assert.equal(result.user._id, lastUser._id);

        return done();
      });
  });

  // test expected errors
  it('missing name in object: should return error (400)', (done) => {
    request(app)
      .post('/users')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const result = res.body;
        assert.equal(result.success, false);
        assert.equal(result.reason, 'missing user name');

        return done();
      });
  });

  it('user not found: should return error (404)', (done) => {
    const id = '5517ddf4c4b1235721fd8278';

    request(app)
      .get(`/users/${id}`)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);

        const result = res.body;
        assert.equal(result.success, false);
        assert.equal(result.reason, 'user id not found');

        return done();
      });
  });
});
