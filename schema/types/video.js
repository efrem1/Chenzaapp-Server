const {
    GraphQLID,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
  } = require("graphql");
  const Buffer = require("buffer").Buffer;
  const formatDate = require("../../utils/formatDate");
  
  module.exports = new GraphQLObjectType({
    name: "Video",
    fields: () => ({
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: "Globally unique ID of the Video",
        resolve: (obj) => Buffer.from(`cursor-${obj.id}`).toString("base64"),
      },
      _id: {
        type: new GraphQLNonNull(GraphQLID),
        description: "Database ID of the video",
        resolve: (obj) => obj.id,
      },
      filename: {
        type: new GraphQLNonNull(GraphQLString),
        description: "filename of the video",
        resolve: (obj) => obj.filename,
      },
      caption: {
        type: GraphQLString,
        description: "filename of the video",
        resolve: (obj) => obj.caption,
      },
      type: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Type of the video",
        resolve: (obj) => obj.type,
      },
      size: {
        type: new GraphQLNonNull(GraphQLFloat),
        description: "Size of the video",
        resolve: (obj) => obj.size,
      },
      width: {
        type: new GraphQLNonNull(GraphQLFloat),
        description: "Width of the video",
        resolve: (obj) => obj.width,
      },
      height: {
        type: new GraphQLNonNull(GraphQLFloat),
        description: "height of the video",
        resolve: (obj) => obj.height,
      },
      ratio: {
        type: new GraphQLNonNull(GraphQLFloat),
        description: "Ratio of the video",
        resolve: (obj) => obj.ratio,
      },
      post_id: {
        type: new GraphQLNonNull(GraphQLID),
        description: "Post id",
        resolve: (obj) => obj.post_id,
      },
      created_at: {
        type: new GraphQLNonNull(GraphQLString),
        description: "User created date",
        resolve: (obj) => formatDate(obj.created_at),
      },
      updated_at: {
        type: new GraphQLNonNull(GraphQLString),
        description: "User updated date",
        resolve: (obj) => formatDate(obj.updated_at),
      },
    }),
  });
  