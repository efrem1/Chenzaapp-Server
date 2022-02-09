'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OauthRefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OauthRefreshToken.init({
    token: DataTypes.STRING,
    revoked: DataTypes.BOOLEAN,
    exipires: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'OauthRefreshToken',
    underscored: true,
  });
  return OauthRefreshToken;
};