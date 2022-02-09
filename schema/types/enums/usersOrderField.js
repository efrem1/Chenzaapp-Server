const { GraphQLEnumType } = require("graphql");

module.exports = new GraphQLEnumType({
  name: "UsersOrderField",
  values: {
    ID: {
      value: "id",
    },
    CREATED_AT: {
      value: "created_at",
    },
  },
});
