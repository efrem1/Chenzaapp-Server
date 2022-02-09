const { GraphQLEnumType } = require("graphql");

module.exports = new GraphQLEnumType({
  name: "PostsOrderField",
  values: {
    ID: {
      value: "id",
    },
    CREATED_AT: {
      value: "created_at",
    },
  },
});
