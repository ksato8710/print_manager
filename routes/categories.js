const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');

router.get('/categories', CategoryController.getCategories);
router.post('/categories', CategoryController.createCategory);
router.put('/categories/:id', CategoryController.updateCategory);
router.delete('/categories/:id', CategoryController.deleteCategory);

module.exports = router;
