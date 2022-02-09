const { GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
const connection = require("../types/connection");
const order = require("../types/inputs/order");
const nodesToEdges = require("./nodesToEdges");
const toConnection = require("./toConnection");
const Buffer = require("buffer").Buffer;
const user = require("../types/user");
const usersOrderField = require("../types/enums/usersOrderField");

module.exports = {
  type: connection("UserConnection", "UserEdge", user),
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
    firstname: {
      type: GraphQLString,
    },
    lastname: {
      type: GraphQLString,
    },
    orderBy: {
      type: new GraphQLList(order("UsersOrder", usersOrderField)),
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
    const users = await context.repositories.user.find({
      first: args.first,
      after,
      firstname: args.firstname,
      lastname: args.lastname,
      orderBy: args.orderBy,
    });

    const usersCount = await context.repositories.user.count({
      firstname: args.firstname,
      lastname: args.lastname,
    });

    const edges = nodesToEdges(users, after);
    return toConnection(
      edges,
      usersCount,
      edges.length === args.first ? true : false,
      after > 0 ? true : false
    );
  },
};
