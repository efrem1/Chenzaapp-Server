const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require("graphql");
const user = require("./user");
const Buffer = require("buffer").Buffer;
const formatDate = require("../../utils/formatDate");
const connection = require("./connection");
const photo = require("./photo");
const video = require('./video');
const toConnection = require("../queries/toConnection");
const nodesToEdges = require("../queries/nodesToEdges");

module.exports = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: "Globally unique ID of the post",
      resolve: (obj) => Buffer.from(`cursor-${obj.id}`).toString("base64"),
    },
    _id: {
      type: new GraphQLNonNull(GraphQLID),
      description: "Database ID of the post",
      resolve: (obj) => obj.id,
    },
    content: {
      type: GraphQLString,
      description: "Text content of the post",
      resolve: (obj) => obj.content,
    },
    parent_id: {
      type: GraphQLID,
      description: "Globally unique ID of the shared post",
      resolve: (obj) =>
        Buffer.from(`cursor-${obj.parent_id}`).toString("base64"),
    },
    _parent_id: {
      type: GraphQLID,
      description: "Database unique ID of the shared post",
      resolve: (obj) => obj.parent_id,
    },
    user_id: {
      type: new GraphQLNonNull(GraphQLID),
      description: "Database unique ID of the owner of the post",
      resolve: (obj) => obj.user_id,
    },
    published_at: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Post published time",
      resolve: (obj) => formatDate(obj.published_at),
    },
    created_at: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Post created time",
      resolve: (obj) => formatDate(obj.created_at),
    },
    updated_at: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Post updated time",
      resolve: (obj) => formatDate(obj.updated_at),
    },
    user: {
      type: user,
      description: "Owner of the post",
      resolve: (obj, args, context) => {
        return context.loaders.user.load(obj.user_id);
      },
    },
    photos: {
      type: connection("PhotoConnection", "PhotoEdge", photo),
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
      },
      resolve: async (obj, args, context) => {
        const after =
          typeof args.after === "undefined" || args.after === null
            ? 0
            : parseInt(
                Buffer.from(args.after, "base64")
                  .toString("ascii")
                  .replace("cursor", ""),
                10
              );
        const photos = await context.repositories.photo.find({
          first: args.first,
          after,
          post_id: obj.id,
        });
        const photoCount = await context.repositories.photo.count({
          post_id: obj.id,
        });
        const edges = nodesToEdges(photos, after);
        return toConnection(
          edges,
          photoCount,
          edges.length === args.first,
          after > 0
        );
      },
    },
    video: {
      type: connection("VideoConnection", "VideoEdge", video),
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
      },
      resolve: async (obj, args, context) => {
        const after =
          typeof args.after === "undefined" || args.after === null
            ? 0
            : parseInt(
                Buffer.from(args.after, "base64")
                  .toString("ascii")
                  .replace("cursor", ""),
                10
              );
        const photos = await context.repositories.video.find({
          first: args.first,
          after,
          post_id: obj.id,
        });
        const photoCount = await context.repositories.video.count({
          post_id: obj.id,
        });
        const edges = nodesToEdges(photos, after);
        return toConnection(
          edges,
          photoCount,
          edges.length === args.first,
          after > 0
        );
      },
    },
  }),
});
