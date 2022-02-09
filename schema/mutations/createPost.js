const { GraphQLNonNull } = require("graphql");
const postType = require("../types/post");
const newPost = require("../types/inputs/newPost");

module.exports = {
  type: postType,
  args: {
    input: {
      type: new GraphQLNonNull(newPost),
    },
  },
  resolve: (_, { input }, context) => {
    if (!context.user) {
      throw new Error("Unauthorized");
    }
    input.user_id = context.user.id;
    return context.repositories.post.create(input);
  },
};
