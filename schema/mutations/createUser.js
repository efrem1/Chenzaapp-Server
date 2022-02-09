const { GraphQLNonNull } = require("graphql");
const userType = require("../types/user");
const newUser = require("../types/inputs/newUser");

module.exports = {
  type: userType,
  args: {
    input: {
      type: new GraphQLNonNull(newUser),
    },
  },
  resolve: (_, { input }, context) => {
    return context.repositories.user.create(input);
  },
};
