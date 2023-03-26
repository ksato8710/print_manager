const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Family extends Model {}
Family.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'family',
    timestamps: true,
    underscored: true,
  }
);

module.exports = Family;
