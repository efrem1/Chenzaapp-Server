"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Likes.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      Likes.belongsTo(models.Posts, {
        foreignKey: "post_id",
        as: "post",
      });
    }
  }
  Likes.init(
    {},
    {
      sequelize,
      modelName: "Likes",
      underscored: true,
    }
  );
  return Likes;
};
