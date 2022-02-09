const context = require("../context");
const { OauthAccessToken, User } = require("../models");

module.exports = async (req) => {
  var accessToken = null;
  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(" ");
    if (parts.length == 2) {
      var scheme = parts[0],
        credentials = parts[1];
      if (/^Bearer$/i.test(scheme)) {
        accessToken = credentials;
      }
    }
  }
  if (accessToken) {
    const { owner } = await OauthAccessToken.findOne({
      where: { token: accessToken },
      include: [{ model: User, as: "owner" }],
    });
    const user = {
      id: owner.id,
    };
    return { ...context, user: user };
  }
  return { ...context };
};
