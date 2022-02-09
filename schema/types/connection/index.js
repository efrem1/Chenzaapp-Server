const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} = require("graphql");
const pageInfo = require("../pageInfo");
const edge = require("../edge");

module.exports = (connName, edgeName, type) =>
  new GraphQLObjectType({
    name: connName,
    fields: {
      totalCount: {
        description: "Identifies the total count of items in the connection.",
        type: new GraphQLNonNull(GraphQLInt),
      },
      edges: {
        description: "A list of edges.",
        type: new GraphQLList(edge(edgeName, type)),
      },
      pageInfo: {
        type: new GraphQLNonNull(pageInfo),
      },
    },
  });
