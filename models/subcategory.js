"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subcategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Subcategory.hasMany(models.Class, { as: "class", foreignKey: "classId" });

      Subcategory.belongsTo(models.Category, {
        as: "category",
        foreignKey: "categoryId",
      });
    }
  }
  Subcategory.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Category", // Can be both a string representing the table name or a Sequelize model
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Subcategory",
    }
  );
  return Subcategory;
};
