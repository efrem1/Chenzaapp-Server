const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} = require("graphql");

module.exports = new GraphQLInputObjectType({
  name: "NewUser",
  fields: {
    firstname: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lastname: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    mobile: {
      type: new GraphQLNonNull(GraphQLString),
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    about: {
      type: new GraphQLNonNull(GraphQLString),
    },
    gender: {
      type: new GraphQLNonNull(GraphQLString),
    },
    dob: {
      type: new GraphQLNonNull(GraphQLString),
    },
    color: {
      type: new GraphQLNonNull(GraphQLString),
    },
    mood: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

