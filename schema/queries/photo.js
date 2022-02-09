const { GraphQLID, GraphQLNonNull } = require("graphql");
const photoType = require("../types/photo");

module.exports = {
  type: photoType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: (_, { id }, context) => {
    return context.repositories.photo.get(id);
  },
};
