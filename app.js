const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const pkg = require('./package.json');

const app = express();
module.exports = app;

app.use(morgan('dev'));
app.use(bodyParser.json());

function getDB() {
  return app.get('db');
}

const users = require('./lib/users')(getDB);

app.get('/', (req, res) => {
  res.json({ name: pkg.name, version: pkg.version });
});

app.get('/users', (req, res) => {
  users.getUsers((err, result) => {
    if (err) {
      // just an example (we don't actually throw any errors in getUsers)
      return res.status(500).json({ success: false, reason: err.message });
    }

    return res.send({ success: true, users: result });
  });
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;

  users.getUser(id, (err, result) => {
    if (err) {
      // just an example (bad request)
      return res.status(400).json({ success: false, reason: err.message });
    }

    if (!result) {
      return res.status(404).json({ success: false, reason: 'user id not found' });
    }

    return res.send({ success: true, user: result });
  });
});

app.post('/users', (req, res) => {
  const user = req.body;

  users.addUser(user, (err, result) => {
    if (err) {
      // just an example (bad request) since the only error that we throw is if missing user name
      return res.status(400).json({ success: false, reason: err.message });
    }

    return res.send({ success: true, user: result });
  });
});
