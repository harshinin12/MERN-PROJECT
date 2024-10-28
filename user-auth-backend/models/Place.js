const mongoose = require('mongoose');
const { connectDB2 } = require('../config/db');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  location: { type: String, required: true },
  amenities: [String],
  details: { type: String },
});

async function createPlaceModel() {
  const listingsDB = await connectDB2();
  return listingsDB.model('Place', placeSchema);
}

module.exports = createPlaceModel();
