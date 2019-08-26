const { GraphQLObjectType } = require('graphql');

const createPost = require('./mutations/createPost');
const updatePost = require('./mutations/updatePost');
const deletePost = require('./mutations/deletePost');

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPost,
    updatePost,
    deletePost,
  },
});

module.exports = Mutation;
