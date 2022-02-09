const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
} = require("graphql");

module.exports = new GraphQLInputObjectType({
  name: "NewPhoto",
  fields: {
    filename: {
      type: new GraphQLNonNull(GraphQLString),
    },
    caption: {
      type: GraphQLString,
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
    size: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    width: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    height: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    ratio: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    post_id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
});
