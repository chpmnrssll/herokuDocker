const { GraphQLString } = require('graphql');
const postGraphQLType = require('../types/postType');
const Post = require('../models/post');

module.exports = {
  type: postGraphQLType,
  args: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  },
  resolve(parent, args) {
    const newPost = new Post({
      title: args.title,
      description: args.description,
    });

    return newPost.save();
  },
};
