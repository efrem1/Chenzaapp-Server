const { GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
const nodesToEdges = require("./nodesToEdges");
const toConnection = require("./toConnection");
const order = require("../types/inputs/order");
const connection = require("../types/connection");
const postsOrderField = require("../types/enums/postOrderField");
const post = require("../types/post");
const Buffer = require("buffer").Buffer;

module.exports = {
  type: connection("PostConnection", "PostEdge", post),
  args: {
    first: {
      defaultValue: 10,
      description:
        "Limits the number of results returned in the page. Defaults to 10.",
      type: GraphQLInt,
    },
    after: {
      defaultValue: "Y3Vyc29yMA==", // base64encode('cursor0')
      description:
        "The cursor value of an item returned in previous page. An alternative to in integer offset.",
      type: GraphQLString,
    },
    orderBy: {
      type: new GraphQLList(order("PostsOrder", postsOrderField)),
    },
  },
  resolve: async (_, args, context) => {
    const after =
      typeof args.after === "undefined" || args.after === null
        ? 0
        : parseInt(
            Buffer.from(args.after, "base64")
              .toString("ascii")
              .replace("cursor", ""),
            10
          );
    const posts = await context.repositories.post.find({
      first: args.first,
      after,
      orderBy: args.orderBy,
    });

    const postCount = await context.repositories.post.count();

    const edges = nodesToEdges(posts, after);
    return toConnection(
      edges,
      postCount,
      edges.length === args.first ? true : false,
      after > 0 ? true : false
    );
  },
};
