const userService = require('../services/userService');

exports.getUser = async (req, res, next) => {
    try {
        const user = await userService.getUser(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const updatedUser = await userService.updateUser(req.user.id, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        await userService.deleteUser(req.user.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// ... 既存のコード ...
// Register
exports.register = async (req, res, next) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        logger.error(`Error while registering user: ${error.message}`);
        next(error);
    }
};

// Login
exports.login = async (req, res, next) => {
    // ... 実装 ...
};

// Logout
exports.logout = async (req, res, next) => {
    // ... 実装 ...
};
