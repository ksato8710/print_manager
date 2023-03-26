const familyService = require('../services/familyService');

exports.getFamilies = async (req, res, next) => {
    try {
        const families = await familyService.getFamilies(req.user.id);
        res.status(200).json(families);
    } catch (error) {
        next(error);
    }
};

exports.createFamily = async (req, res, next) => {
    try {
        const family = await familyService.createFamily(req.user.id, req.body);
        res.status(201).json(family);
    } catch (error) {
        next(error);
    }
};

exports.updateFamily = async (req, res, next) => {
    try {
        const updatedFamily = await familyService.updateFamily(req.params.id, req.body);
        res.status(200).json(updatedFamily);
    } catch (error) {
        next(error);
    }
};

exports.deleteFamily = async (req, res, next) => {
    try {
        await familyService.deleteFamily(req.params.id);
        res.status(200).json({ message: 'Family deleted successfully' });
    } catch (error) {
        next(error);
    }
};

