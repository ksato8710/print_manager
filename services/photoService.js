const Photo = require('../models/Photo');
const GoogleDriveService = require('./googleDriveService');

exports.getPhotos = async (familyId, categoryId) => {
  const photos = await Photo.findAll({ where: { familyId, categoryId } });
  return photos;
};

exports.uploadPhoto = async (familyId, categoryId, filePath, mimeType, fileName) => {
  const file = await GoogleDriveService.uploadFile(filePath, mimeType, fileName);
  const photo = await Photo.create({
    familyId,
    categoryId,
    file_id: file.id,
    file_url: file.webContentLink,
    thumbnail_url: file.thumbnailLink,
  });

  return photo;
};

exports.updatePhoto = async (id, familyId, categoryId) => {
  const photo = await Photo.findOne({ where: { id } });

  if (!photo) {
    throw new Error('Photo not found');
  }

  photo.familyId = familyId;
  photo.categoryId = categoryId;
  await photo.save();
  return photo;
};

exports.deletePhoto = async (id) => {
  const photo = await Photo.findOne({ where: { id } });

  if (!photo) {
    throw new Error('Photo not found');
  }

  await GoogleDriveService.deleteFile(photo.file_id);
  await photo.destroy();
};
