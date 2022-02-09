const { GraphQLID, GraphQLNonNull } = require("graphql");
const userType = require("../types/user");

module.exports = {
  type: userType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: (_, { id }, context) => {
    console.log("----------->", context);
    return context.repositories.user.get(id);
  },
};
