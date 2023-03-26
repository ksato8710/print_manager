const Family = require('../models/Family');

exports.getFamilyMembers = async (userId) => {
  const familyMembers = await Family.findAll({ where: { userId } });
  return familyMembers;
};

exports.createFamilyMember = async (userId, name) => {
  const familyMember = await Family.create({ userId, name });
  return familyMember;
};

exports.updateFamilyMember = async (id, userId, name) => {
  const familyMember = await Family.findOne({ where: { id, userId } });

  if (!familyMember) {
    throw new Error('Family member not found');
  }

  familyMember.name = name;
  await familyMember.save();
  return familyMember;
};

exports.deleteFamilyMember = async (id, userId) => {
  const familyMember = await Family.findOne({ where: { id, userId } });

  if (!familyMember) {
    throw new Error('Family member not found');
  }

  await familyMember.destroy();
};
