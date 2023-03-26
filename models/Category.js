const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Category extends Model {}
Category.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'category',
    timestamps: true,
    underscored: true,
  }
);

module.exports = Category;
