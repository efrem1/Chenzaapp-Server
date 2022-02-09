const { GraphQLNonNull } = require("graphql");
const videoType = require("../types/video");
const newVideo = require("../types/inputs/newVideo");

module.exports = {
  type: videoType,
  args: {
    input: {
      type: new GraphQLNonNull(newVideo),
    },
  },
  resolve: (_, { input }, context) => {
    return context.repositories.video.create(input);
  },
};
