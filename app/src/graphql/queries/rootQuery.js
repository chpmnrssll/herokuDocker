const { GraphQLObjectType } = require('graphql');
const getAllPosts = require('./getAllPosts');
const getPostById = require('./getPostById');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getPostById,
    getAllPosts,
  },
});

module.exports = RootQuery;
