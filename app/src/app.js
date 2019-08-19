const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const pkg = require('../package.json');

const app = express();
const Post = require('./models/posts');

const APP_PORT = process.env.APP_PORT || 8080;
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = '/posts';

const DB_URL = process.env.MONGODB_URI || `mongodb://db:${DB_PORT}${DB_NAME}`;
console.log(`DB_URL: ${DB_URL}`);
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined')); // 'dev'

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (error) => {
  // If first connect fails because server-database isn't up yet, try again.
  // This is only needed for first connect, not for runtime reconnects.
  // See: https://github.com/Automattic/mongoose/issues/5169
  if (error.message && error.message.match(/failed to connect to server .* on first connect/)) {
    setTimeout(() => {
      mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).catch(() => {
        // empty catch avoids unhandled rejections
      });
    }, 20 * 1000);
  } else {
    // Some other error occurred.  Log it.
    throw new Error(error);
  }
});

db.once('open', () => {
  const server = app.listen(APP_PORT, () => {
    app.set('server', server);
    app.set('db', db);
    // Users = Users(db);
    console.log(`Server listening on port ${APP_PORT}`);
  });
});


app.get('/', (req, res) => {
  res.json({ name: pkg.name, dependencies: pkg.dependencies });
});

app.get('/posts', (req, res) => {
  Post.find({}, 'title description', (error, posts) => {
    if (error) {
      res.send(error);
    }
    res.send({ posts });
  }).sort({ _id: -1 });
});


// Post Endpoints
app.post('/posts', (req, res) => {
  const { title } = req.body;
  const { description } = req.body;
  const newPost = new Post({
    title,
    description,
  });

  newPost.save((error) => {
    if (error) {
      res.send(error);
    }
    res.send({
      success: true,
      message: 'Post saved successfully!',
    });
  });
});

// Fetch single post
app.get('/post/:id', (req, res) => {
  Post.findById(req.params.id, 'title description', (error, post) => {
    if (error) {
      res.send(error);
    }
    res.send(post);
  });
});

// Update a post
app.put('/posts/:id', (req, res) => {
  Post.findById(req.params.id, 'title description', (error, post) => {
    if (error) {
      res.send(error);
    }

    const updatedPost = {
      ...post,
      title: req.body.title,
      description: req.body.description,
    };
    updatedPost.save((err) => {
      if (err) {
        res.send(err);
      }
      res.send({
        success: true,
      });
    });
  });
});

// Delete a post
app.delete('/posts/:id', (req, res) => {
  Post.remove({ _id: req.params.id }, (error) => {
    if (error) {
      res.send(error);
    }
    res.send({
      success: true,
    });
  });
});

module.exports = app;
