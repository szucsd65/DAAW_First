const equipmentService = require("../services/equipmentService");

exports.getAll = async (req, res, next) => {
  try {
    let filter = {};
    if (req.query.type) {
      filter.tipus = req.query.type;
    }
    const equipments = await equipmentService.getAll(filter);
    res.json(equipments);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const equipment = await equipmentService.getById(req.params.id);
    if (!equipment) {
      return res.status(404).json({ error: "Equipment not found" });
    }
    res.json(equipment);
  } catch (err) {
    next(err);
  }
};

exports.searchEquipment = async (req, res, next) => {
  try {
    const results = await equipmentService.searchEquipments(req.query.q)
    res.json(results);
  }
  catch (err)
  {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const equipment = await equipmentService.createEquipment(req.body);
    res.status(201).json(equipment);
  } catch (err) {
    next(err);
  }
};


exports.update = async (req, res, next) => {
  try {
    const equipment = await equipmentService.updateEquipment(req.params.id, req.body);
    if (!equipment) {
      return res.status(404).json({ error: "Equipment not found" });
    }
    res.json(equipment);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const equipment = await equipmentService.deleteEquipment(req.params.id);
    if (!equipment) {
      return res.status(404).json({ error: "Equipment not found" });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

exports.getTypes = async (req, res, next) => {
  try {
    const types = await equipmentService.getEquipmentTypes();
    res.json(types);
  } catch (err) {
    next(err);
  }
};