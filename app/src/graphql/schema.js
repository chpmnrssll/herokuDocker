const { GraphQLSchema } = require('graphql');

const Mutations = require('./mutations');
const RootQuery = require('./queries/rootQuery');

module.exports = new GraphQLSchema({
  mutation: Mutations,
  query: RootQuery,
});
