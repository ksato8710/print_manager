const photoService = require('../services/photoService');

exports.getPhotos = async (req, res, next) => {
    try {
        const { familyId, categoryId } = req.query;
        const photos = await photoService.getPhotos(req.user.id, familyId, categoryId);
        res.status(200).json(photos);
    } catch (error) {
        next(error);
    }
};

exports.uploadPhoto = async (req, res, next) => {
    try {
        const { file, familyId, categoryId } = req.body;
        const photo = await photoService.uploadPhoto(req.user.id, familyId, categoryId, file);
        res.status(201).json(photo);
    } catch (error) {
        next(error);
    }
};

exports.updatePhoto = async (req, res, next) => {
    try {
        const updatedPhoto = await photoService.updatePhoto(req.params.id, req.body);
        res.status(200).json(updatedPhoto);
    } catch (error) {
        next(error);
    }
};

exports.deletePhoto = async (req, res, next) => {
    try {
        await photoService.deletePhoto(req.params.id);
        res.status(200).json({ message: 'Photo deleted successfully' });
    } catch (error) {
        next(error);
    }
};
