"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Posts);
      User.hasMany(models.Likes);
      User.hasMany(models.OauthAccessToken);
    }
  }
  User.init(
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      middlename: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: DataTypes.STRING,
      mobile: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      about: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Hello!",
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user.png",
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      instagram: DataTypes.STRING,
      facebook: DataTypes.STRING,
      twitter: DataTypes.STRING,
      snapchat: DataTypes.STRING,
      youtube: DataTypes.STRING,
      lastlogin: DataTypes.DATE,
      tiktop: DataTypes.STRING,
      mood: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      underscored: true,
    }
  );
  return User;
};
