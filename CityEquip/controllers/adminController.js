const ApiService = require('../services/apiService');

exports.adminList = async (req, res) => {
  const equipments = await ApiService.getEquipments();
  res.render('admin/list', { equipments });
};

exports.adminCreatePost = async (req, res) => {
  try {
    await ApiService.adminCreate(req.body);
    req.flash('success', 'Equipment created!');
  } catch (err) {
    req.flash('error', err.message);
  }
  res.redirect('/admin/equipments');
};

exports.adminDelete = async (req, res) => {
  res.redirect('/admin/equipments');
};
