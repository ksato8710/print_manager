const User = require('../models/User');

exports.getUserById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

exports.createUser = async (userData) => {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    logger.error(`Error while creating user: ${error.message}`);
    throw error;
  }
};