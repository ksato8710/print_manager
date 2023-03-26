const express = require('express');
const router = express.Router();
const FamilyController = require('../controllers/familyController');

router.get('/families', FamilyController.getFamilies);
router.post('/families', FamilyController.createFamily);
router.put('/families/:id', FamilyController.updateFamily);
router.delete('/families/:id', FamilyController.deleteFamily);

module.exports = router;
