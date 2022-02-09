const { GraphQLObjectType, GraphQLString } = require("graphql");

module.exports = (name, type) =>
  new GraphQLObjectType({
    name: name,
    description: "List of edges",
    fields: {
      node: {
        description: "The item at the end of the edge.",
        type: type,
      },
      cursor: {
        description: "A cursor for pagination.",
        type: GraphQLString,
      },
    },
  });
