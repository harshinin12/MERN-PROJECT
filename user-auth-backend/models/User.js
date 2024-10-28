const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  userMode: { type: String, default: 'Guest' },
  age: { type: Number, required: true },
  residency: { type: String, required: true },
  bio: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
