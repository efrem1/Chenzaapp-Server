const { GraphQLInputObjectType, GraphQLNonNull } = require("graphql");
const direction = require("../enums/direction");

module.exports = (name, fields) =>
  new GraphQLInputObjectType({
    name: name,
    fields: {
      field: {
        type: new GraphQLNonNull(fields),
      },
      direction: {
        type: new GraphQLNonNull(direction),
      },
    },
  });
