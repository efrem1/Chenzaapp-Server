"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OauthClient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OauthClient.hasMany(models.OauthAccessToken);
    }
  }
  OauthClient.init( 
    {
      name: DataTypes.STRING,
      secret: DataTypes.STRING,
      revoked: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "OauthClient",
      underscored: true,
    }
  );
  return OauthClient;
};
