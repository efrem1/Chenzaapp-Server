"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OauthAccessToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OauthAccessToken.hasOne(models.OauthRefreshToken);
      OauthAccessToken.belongsTo(models.OauthClient, {
        foreignKey: "oauth_client_id",
        as: "client",
      });
      OauthAccessToken.belongsTo(models.User, {
        foreignKey: "user_id",
        as:"owner"
      });
    }
  }
  OauthAccessToken.init(
    {
      token: DataTypes.STRING,
      name: DataTypes.STRING,
      scopes: DataTypes.STRING,
      revoked: DataTypes.BOOLEAN,
      exipires: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "OauthAccessToken",
      underscored: true,
    }
  );
  return OauthAccessToken;
};
