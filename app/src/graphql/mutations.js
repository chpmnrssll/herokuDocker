const { GraphQLObjectType } = require('graphql');

const addPost = require('./mutations/addPost');
const updatePost = require('./mutations/updatePost');
const removePost = require('./mutations/removePost');

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPost,
    updatePost,
    removePost,
  },
});

module.exports = Mutation;
