const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  tipus: { type: String, index: true },
  localitzacio: String,
  districte: { type: String, index: true },
  latitud: { type: Number, default: 41.118 },
  longitud: { type: Number, default: 1.245 },
  horari: String,
  telefon: String,
  createdAt: { type: Date, default: Date.now }
});

equipmentSchema.index({ nom: 'text', tipus: 'text', localitzacio: 'text' });

module.exports = mongoose.model('Equipment', equipmentSchema);
