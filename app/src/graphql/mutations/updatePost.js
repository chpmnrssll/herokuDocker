const { GraphQLString } = require('graphql');
const postGraphQLType = require('../types/postType');
const Post = require('../models/post');

module.exports = {
  type: postGraphQLType,
  args: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  },
  resolve(parent, args) {
    return Post.findById(args.id)
      .then((post) => {
        const updatedPost = post;
        updatedPost.title = args.title;
        updatedPost.description = args.description;

        return updatedPost.save();
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
};
