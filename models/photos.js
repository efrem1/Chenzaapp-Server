"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Photos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Photos.belongsTo(models.Posts, {
        foreignKey: "post_id",
        as: "post",
      });
    }
  }
  Photos.init(
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
      width: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      height: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      ratio: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      caption: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Photos",
      underscored: true,
    }
  );
  return Photos;
};
