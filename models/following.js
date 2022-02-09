"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Following extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Following.belongsTo(models.User, {
        foreignKey: "master_id",
        as: "master",
      });
      Following.belongsTo(models.User, {
        foreignKey: "slave_id",
        as: "slave",
      });
    }
  }
  Following.init(
    {
      master_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      slave_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      actionAt: DataTypes.DATE,
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Following",
      underscored: true,
    }
  );
  return Following;
};
