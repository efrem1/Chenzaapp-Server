"use strict";
const { Model, User } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Posts.hasMany(models.Audio);
      Posts.hasMany(models.Photos);
      Posts.hasMany(models.Videos);
      Posts.hasMany(models.Likes);
      Posts.hasMany(models.Comments);
      Posts.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Posts.init(
    {
      content: DataTypes.STRING,
      publishedAt: DataTypes.DATE,
      parentId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Posts",
      underscored: true,
    }
  );
  return Posts;
};
