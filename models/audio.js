"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Audio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Audio.belongsTo(models.Posts, {
        foreignKey: "post_id",
        as: "post",
      });
    }
  }
  Audio.init(
    {
      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      caption: DataTypes.STRING,
      duration: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Audio",
      underscored: true,
    }
  );
  return Audio;
};
