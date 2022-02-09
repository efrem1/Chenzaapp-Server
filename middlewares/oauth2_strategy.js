const passport = require("passport");
var ClientPasswortStrategy =
  require("passport-oauth2-client-password").Strategy;
const { OauthClient } = require("../models");

passport.use(
  new ClientPasswortStrategy(function (clientId, clientSecret, done) {
    OauthClient.findByPk(clientId)
      .then((client) => {
        if (client.secret != clientSecret) {
          return done(null, false);
        }
        if (client.revoked) {
          return done(null, false);
        }
        return done(null, { id: client.id });
      })
      .catch((error) => {
        if (error.hasOwnProperty("message")) {
          return done(null, false);
        }
        return done(error);
      });
  })
);
