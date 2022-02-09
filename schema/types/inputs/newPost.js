const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} = require("graphql");

module.exports = new GraphQLInputObjectType({
  name: "NewPost",
  fields: {
    content: {
      type: GraphQLString,
    },
    parent_id: {
      type: GraphQLID,
    },
  },
});
