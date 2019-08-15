require('dotenv').config();
const debug = require('debug')('demo:server');
const { MongoClient } = require('mongodb');
const util = require('util');
const app = require('./app');

const port = process.env.PORT || 3000;
const mongoUrl = util.format('mongodb://mongo:%s/demo', process.env.MONGO_PORT);
let server = {};

MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
  if (err) {
    console.error(mongoUrl);
    throw new Error(err);
    // console.error(err);
  } else {
    debug('connected to mongo');
    server = app.listen(port, () => {
      app.set('server', server);
      app.set('db', db);
      debug(`server listening on port ${port}`);
    });
  }
});
