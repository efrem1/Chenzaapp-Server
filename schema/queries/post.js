const { GraphQLID, GraphQLNonNull } = require("graphql");
const postType = require("../types/post");

module.exports = {
  type: postType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: (_, { id }, context) => {
    return context.repositories.post.get(id);
  },
};
