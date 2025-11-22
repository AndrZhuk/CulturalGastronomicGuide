const mongoose = require('mongoose');

const establishmentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  country: { type: String, required: true },
  type: [String],
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  rating: { type: Number, required: true },
  address: { type: String, required: true },
});

const Establishment = mongoose.model('Establishment', establishmentSchema);

module.exports = Establishment;
