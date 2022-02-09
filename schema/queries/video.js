const { GraphQLID, GraphQLNonNull } = require("graphql");
const videoType = require("../types/video");

module.exports = {
  type: videoType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: (_, { id }, context) => {
    return context.repositories.video.get(id);
  },
};
