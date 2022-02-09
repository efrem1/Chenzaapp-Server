const oauth2orize = require("oauth2orize");
const passport = require("passport");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { OauthAccessToken, OauthRefreshToken, User } = require("../models");

const OauthServer = oauth2orize.createServer();

OauthServer.exchange(
  oauth2orize.exchange.password(function (
    client,
    username,
    password,
    scope,
    done
  ) {
    User.findOne({ where: { username: username } })
      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.password, (error, comparison) => {
            if (error) {
              return done(error);
            }

            if (comparison) {
              var _access_token = crypto.randomBytes(32).toString("hex");
              var _refresh_token = crypto.randomBytes(32).toString("hex");
              const access_expires = new Date();
              const refresh_expires = new Date();
              access_expires.setFullYear(access_expires.getFullYear() + 1);
              refresh_expires.setFullYear(refresh_expires.getFullYear() + 2);

              OauthAccessToken.findOrCreate({
                where: { user_id: user.id, oauth_client_id: client.id },
                defaults: {
                  token: _access_token,
                  exipires: access_expires,
                },
              })
                .then(([accesstoken, created]) => {
                  if (!created) {
                    accesstoken
                      .update({
                        token: _access_token,
                        exipires: access_expires,
                      })
                      .catch();
                  }
                  return OauthRefreshToken.findOrCreate({
                    where: { oauth_access_token_id: accesstoken.id },
                    defaults: {
                      token: _refresh_token,
                      exipires: refresh_expires,
                    },
                  });
                })
                .then(([refreshToken, created]) => {
                  if (!created) {
                    refreshToken.update({
                      token: _refresh_token,
                      exipires: refresh_expires,
                    });
                  }
                  return done(null, _access_token, _refresh_token, {
                    expires_in: access_expires,
                  });
                })
                .catch((error) => {
                  if (error.hasOwnProperty("message")) {
                    return done(null, false);
                  }
                  return done(error);
                });
            } else {
              done(null, false);
            }
          });
        } else {
          done(null, false);
        }
      })
      .catch((error) => {
        if (error.hasOwnProperty("message")) {
          return done(null, false);
        }
        return done(error);
      });
  })
);

OauthServer.exchange(
  oauth2orize.exchange.refreshToken(function (
    client,
    refreshToken,
    scope,
    done
  ) {
    OauthRefreshToken.findOne({ where: { token: refreshToken } }).then(
      (_refreshToken) => {
        if (!_refreshToken) {
          return done(null, false);
        }
        if (_refreshToken.revoked) {
          return done(null, false);
        }
        var _access_token = crypto.randomBytes(32).toString("hex");
        var _refresh_token = crypto.randomBytes(32).toString("hex");
        const access_expires = new Date();
        const refresh_expires = new Date();
        access_expires.setFullYear(access_expires.getFullYear() + 1);
        refresh_expires.setFullYear(refresh_expires.getFullYear() + 2);
        OauthAccessToken.findByPk(_refreshToken.access_token_id)
          .then((accessToken) => {
            if (accessToken) {
              accessToken
                .update({ token: _access_token, exipires: access_expires })
                .catch();
              _refreshToken
                .update({
                  token: _refresh_token,
                  exipires: refresh_expires,
                })
                .catch();
              return true;
            }
            return false;
          })
          .then((action) => {
            if (action) {
              return done(null, _access_token, _refresh_token, {
                expires_in: access_expires,
              });
            } else {
              return done(null);
            }
          })
          .catch((error) => {
            if (error.hasOwnProperty("message")) {
              return done(null, false);
            }
            done(error);
          });
      }
    );
  })
);

exports.token = [
  passport.authenticate(["oauth2-client-password"], {
    session: false,
  }),
  OauthServer.token(),
  OauthServer.errorHandler(),
];
