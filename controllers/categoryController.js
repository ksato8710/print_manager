const categoryService = require('../services/categoryService');

exports.getCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getCategories(req.user.id);
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};

exports.createCategory = async (req, res, next) => {
    try {
        const category = await categoryService.createCategory(req.user.id, req.body);
        res.status(201).json(category);
    } catch (error) {
        next(error);
    }
};

exports.updateCategory = async (req, res, next) => {
    try {
        const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);
        res.status(200).json(updatedCategory);
    } catch (error) {
        next(error);
    }
};

exports.deleteCategory = async (req, res, next) => {
    try {
        await categoryService.deleteCategory(req.params.id);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        next(error);
    }
};
