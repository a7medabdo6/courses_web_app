"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lesson.belongsTo(models.Class, { as: "class", foreignKey: "classId" });
    }
  }
  Lesson.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      url: DataTypes.TEXT,
      classId: {
        allowNull: false,

        type: DataTypes.INTEGER,
        references: {
          model: "Class", // Can be both a string representing the table name or a Sequelize model
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Lesson",
    }
  );
  return Lesson;
};
