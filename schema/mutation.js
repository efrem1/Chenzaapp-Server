const { GraphQLObjectType } = require("graphql");
const fields = require("./mutations");

module.exports = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    ...fields,
  }),
});
