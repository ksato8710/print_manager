const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Photo extends Model {}
Photo.init(
  {
    file_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    thumbnail_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'photo',
    timestamps: true,
    underscored: true,
  }
);

module.exports = Photo;
