const Equipment = require("../models/Equipment");

exports.getAll = async (filter = {}) => {
  return Equipment.find(filter);
};

exports.getById = async (id) => {
  return Equipment.findById(id);
};

exports.searchEquipments = async (searchTerm) => {
  return Equipment.find({
    $text: { $search: searchTerm }
  }, {
    score: { $meta: "textScore" }
  }).sort({
    score: { $meta: "textScore" }
  }).limit(5);
};

exports.createEquipment = async (equipmentData) => {
  const equipment = new Equipment(equipmentData);
  const savedEquipment = await equipment.save();
  return savedEquipment;
};

exports.updateEquipment = async (id, equipmentData) => {
  return Equipment.findByIdAndUpdate(
    id,
    { $set: equipmentData },
    { new: true, runValidators: true, context: "query" }
  ).exec();
};

exports.deleteEquipment = async (id) => {
  return Equipment.findByIdAndDelete(id);
};

exports.getEquipmentTypes = async () => {
  return Equipment.aggregate([
    { $group: { _id: "$tipus", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
};