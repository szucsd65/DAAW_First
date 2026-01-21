const Equipment = require('../models/Equipment');
const ApiService = require('../services/apiService');


exports.index = async (req, res) => {
  const equipments = await Equipment.find({}).limit(10); 
  res.render('index', { equipments, user: req.user });
};


exports.list = async (req, res) => {
  const equipments = await ApiService.getEquipments({ type: req.query.type });
  res.render('equipments', { equipments });
};


exports.addForm = (req, res) => res.render('addEquipment', { user: req.user });

exports.create = async (req, res) => {
  await Equipment.create(req.body);
  req.flash('success', 'Equipment created!');
  res.redirect('/equipments/add');
};

exports.editForm = async (req, res) => {
  const equipment = await Equipment.findById(req.params.id);
  res.render('editEquipment', { equipment, user: req.user });
};

exports.update = async (req, res) => {
  await Equipment.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/equipment/${req.params.id}`);
};


exports.equipmentDetail = async (req, res) => {
  const equipment = await ApiService.getEquipment(req.params.id);
  res.render('equipment', { equipment });
};
