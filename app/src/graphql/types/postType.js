const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

module.exports = PostType;
