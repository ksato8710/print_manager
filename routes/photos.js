const express = require('express');
const router = express.Router();
const PhotoController = require('../controllers/photoController');

router.get('/photos', PhotoController.getPhotos);
router.post('/photos', PhotoController.createPhoto);
router.put('/photos/:id', PhotoController.updatePhoto);
router.delete('/photos/:id', PhotoController.deletePhoto);

module.exports = router;
