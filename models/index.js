const sequelize = require('../config/database');
const User = require('./User');
const Family = require('./Family');
const Category = require('./Category');
const Photo = require('./Photo');

// モデル同士の関連付け
User.hasMany(Family);
Family.belongsTo(User);

User.hasMany(Category);
Category.belongsTo(User);

Family.hasMany(Photo);
Photo.belongsTo(Family);

Category.hasMany(Photo);
Photo.belongsTo(Category);

// 同期処理
sequelize.sync({ alter: true });

module.exports = { User, Family, Category, Photo };
