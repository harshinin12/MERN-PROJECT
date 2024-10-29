// models/Booking.js

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  roomType: { type: String, required: true },
  guests: { type: Number, required: true },
  arrivalDate: { type: Date, required: true },
  arrivalTime: { type: String, required: true },
  departureDate: { type: Date, required: true },
  pickup: { type: String, required: true },
  specialRequests: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Booking', bookingSchema);
