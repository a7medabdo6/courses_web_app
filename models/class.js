"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Class.hasMany(models.Lesson, { as: "lessons" });

      Class.belongsTo(models.Subcategory, {
        as: "subcategory",
        foreignKey: "subcategoryId",
      });
    }
  }
  Class.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      subcategoryId: {
        allowNull: false,

        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Class",
    }
  );
  return Class;
};
