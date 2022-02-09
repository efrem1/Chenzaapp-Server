const { GraphQLObjectType } = require("graphql");
const fields = require("./queries");

module.exports = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    ...fields,
  }),
});
