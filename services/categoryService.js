const Category = require('../models/Category');

exports.getCategories = async (userId) => {
  const categories = await Category.findAll({ where: { userId } });
  return categories;
};

exports.createCategory = async (userId, name) => {
  const category = await Category.create({ userId, name });
  return category;
};

exports.updateCategory = async (id, userId, name) => {
  const category = await Category.findOne({ where: { id, userId } });

  if (!category) {
    throw new Error('Category not found');
  }

  category.name = name;
  await category.save();
  return category;
};

exports.deleteCategory = async (id, userId) => {
  const category = await Category.findOne({ where: { id, userId } });

  if (!category) {
    throw new Error('Category not found');
  }

  await category.destroy();
};
