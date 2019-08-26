const { GraphQLList } = require('graphql');
const postGraphQLType = require('../types/postType');
const Post = require('../../models/post');

module.exports = {
  type: new GraphQLList(postGraphQLType),
  args: {},
  resolve() {
    return Post.find();
  },
};
