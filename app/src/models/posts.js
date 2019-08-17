const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: String,
  description: String,
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
