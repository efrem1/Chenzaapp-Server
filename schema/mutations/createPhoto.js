const { GraphQLNonNull } = require("graphql");
const photoType = require("../types/photo");
const newPhoto = require("../types/inputs/newPhoto");

module.exports = {
  type: photoType,
  args: {
    input: {
      type: new GraphQLNonNull(newPhoto),
    },
  },
  resolve: (_, { input }, context) => {
    return context.repositories.photo.create(input);
  },
};
