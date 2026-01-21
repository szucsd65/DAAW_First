const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equipmentSchema = new Schema({
  nom: { type: String, required: true },
  tipus: String,
  localitzacio: String,
  districte: String,
  latitud: Number,
  longitud: Number,

  averageRating: { type: Number, default: 0, min: 0, max: 5 },
  reviews: [{
    user: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    rating: { 
      type: Number, 
      required: true, 
      min: 1, 
      max: 5 
    },
    text: String,
    createdAt: { 
      type: Date, 
      default: Date.now 
    }
  }]
});

module.exports = mongoose.model('Equipment', equipmentSchema);
