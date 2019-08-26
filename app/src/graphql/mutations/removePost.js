const { GraphQLString } = require('graphql');
const postGraphQLType = require('../types/postType');
const Post = require('../models/post');

module.exports = {
  type: postGraphQLType,
  args: {
    id: { type: GraphQLString },
  },
  resolve(parent, args) {
    return Post.findOneAndDelete(args.id).exec()
      .then((post) => post.remove())
      .catch((error) => {
        throw new Error(error);
      });
  },
};
