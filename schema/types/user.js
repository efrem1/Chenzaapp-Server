const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require("graphql");
const Buffer = require("buffer").Buffer;
const formatDate = require("../../utils/formatDate");

module.exports = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: "Globally unique ID of the user",
      resolve: (obj) => Buffer.from(`cursor-${obj.id}`).toString("base64"),
    },
    _id: {
      type: new GraphQLNonNull(GraphQLID),
      description: "Database ID of the user",
      resolve: (obj) => obj.id,
    },
    firstname: {
      type: new GraphQLNonNull(GraphQLString),
      description: "First name of the user",
      resolve: (obj) => obj.firstname,
    },
    lastname: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Last name of the user",
      resolve: (obj) => obj.lastname,
    },
    middlename: {
      type: GraphQLString,
      description: "Middle name of the user",
      resolve: (obj) => obj.middlename,
    },
    email: {
      type: GraphQLString,
      description: "Email of the user",
      resolve: (obj) => obj.email,
    },
    mobile: {
      type: GraphQLString,
      description: "Phone number of the user",
      resolve: (obj) => obj.mobile,
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
      description: "User name of the user",
      resolve: (obj) => obj.username,
    },
    about: {
      type: new GraphQLNonNull(GraphQLString),
      description: "About statement of the user",
      resolve: (obj) => obj.about,
    },
    gender: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Gender of the user",
      resolve: (obj) => obj.gender,
    },
    dob: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Date of birth of user",
      resolve: (obj) => formatDate(obj.dob),
    },
    picture: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Profile image of the user",
      resolve: (obj) => obj.picture,
    },
    color: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Color pallete of the user",
      resolve: (obj) => obj.color,
    },
    mood: {
      type: GraphQLString,
      description: "Mood of the user",
      resolve: (obj) => obj.mood,
    },
    instagram: {
      type: GraphQLString,
      description: "Instagram url of user",
      resolve: (obj) => obj.instagram,
    },
    facebook: {
      type: GraphQLString,
      description: "Facebook url of user",
      resolve: (obj) => obj.facebook,
    },
    youtube: {
      type: GraphQLString,
      description: "YouTube url of user",
      resolve: (obj) => obj.youtube,
    },
    twitter: {
      type: GraphQLString,
      description: "Twitter url of user",
      resolve: (obj) => obj.twitter,
    },
    snapchat: {
      type: GraphQLString,
      description: "SnapChat url of user",
      resolve: (obj) => obj.snapchat,
    },
    youtube: {
      type: GraphQLString,
      description: "YouTube url of user",
      resolve: (obj) => obj.youtube,
    },
    tiktok: {
      type: GraphQLString,
      description: "TikTok url of user",
      resolve: (obj) => obj.tiktok,
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
